const UserService = require("../services/userServices");
const { appResponse } = require("../../lib/appResponse");
const { MSG_TYPES } = require("../../constants/types");

class UserCtrl {
  //Create a user
  async register(req, res) {
    try {
      const { providerId, fields } = req.body;

      //check if data already exists
      for await (const field of fields) {
        const name = field.name;
        const age = field.age;
        const timestamp = field.timestamp;

        const getUser = await UserService.findOne({
          name,
          age,
          timestamp,
          providerId,
        });
        if (getUser) {
          return appResponse(res, 409, MSG_TYPES.ONE_OR_MORE_DUPLICATE);
        }
      }

      //register user
      for (let i = 0; i < fields.length; i++) {
        await UserService.register({ providerId, ...fields[i] });
      }

      const data = await UserService.findByProviderId(providerId);

      return appResponse(res, 201, MSG_TYPES.CREATED, data);
    } catch (err) {
      return appResponse(res, 500, MSG_TYPES.SERVER_ERROR(err));
    }
  }

  //Get all available users
  async getUsers(req, res) {
    const providerId = req.params.providerId;
    const { name, age, timestamp } = req.query;

    const users = await UserService.findByProviderId(providerId);

    let data = users;

    if (data.length) {
      if (name) {
        const splittedName = name.split(":");
        const nameAcronym = splittedName[0]?.toString()?.toLowerCase();
        const nameValue = splittedName[1]?.toString()?.toLowerCase();

        //if filter has acronym
        if (nameValue) {
          //if filter acronym is allowed
          if (nameAcronym === "eqc") {
            data = data.filter((user) =>
              user.name?.toString()?.toLowerCase().includes(nameValue)
            );
          } else {
            return appResponse(
              res,
              400,
              `Name Acronym ${MSG_TYPES.FILTER_NOT_ALLOWED}`
            );
          }
        } else {
          data = data.filter((user) =>
            user.name?.toString()?.toLowerCase().includes(nameAcronym)
          );
        }
      }

      if (age) {
        const splittedAge = age.split(":");
        const ageAcronym = splittedAge[0]?.toString()?.toLowerCase();
        const ageValue = splittedAge[1]?.toString()?.toLowerCase();

        //if filter has acronym
        if (ageValue) {
          //if filter acronym is allowed
          if (ageAcronym === "eq") {
            data = data.filter(
              (user) => user.age?.toString()?.toLowerCase() === ageValue
            );
          } else {
            return appResponse(
              res,
              400,
              `Age Acronym ${MSG_TYPES.FILTER_NOT_ALLOWED}`
            );
          }
        } else {
          data = data.filter(
            (user) => user.age?.toString()?.toLowerCase() === ageAcronym
          );
        }
      }

      if (timestamp) {
        const splittedTimestamp = timestamp.split(":");
        const timestampAcronym = splittedTimestamp[0]
          ?.toString()
          ?.toLowerCase();
        const timestampValue = Number(splittedTimestamp[1]);

        //if filter has acronym
        if (timestampValue) {
          //if filter acronym is allowed
          if (timestampAcronym === "gt" || timestampAcronym === "lt") {
            //if filter acronym is greater than
            if (timestampAcronym === "gt") {
              data = data.filter(
                (user) => timestampValue < Number(user.timestamp)
              );
            } else {
              //if filter acronym is less than
              data = data.filter(
                (user) => timestampValue > Number(user.timestamp)
              );
            }
          } else {
            return appResponse(
              res,
              400,
              `Timestamp Acronym ${MSG_TYPES.FILTER_NOT_ALLOWED}`
            );
          }
        } else {
          //default is greater than
          data = data.filter(
            (user) => timestampAcronym > Number(user.timestamp)
          );
        }
      }

      //adjust response as expected
      data.forEach((user, index) => {
        delete data[index].providerId;
      });

      data = { providerId, data: [...data] };
    }

    return appResponse(res, 200, MSG_TYPES.FETCHED, data);
  }
}

module.exports = new UserCtrl();
