const User = require("../models/UserModel");

class UserService {
  async findOne(data) {
    return await User.findOne(data);
  }

  async register(data) {
    return await User.create({ ...data });
  }

  async findByProviderId(id) {
    return await User.find(
      { providerId: id },
      "-__v -createdAt -updatedAt"
    ).lean();
  }
}

module.exports = new UserService();
