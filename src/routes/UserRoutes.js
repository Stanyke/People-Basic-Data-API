const router = require("express").Router();
const userCtrl = require("../controllers/UserController");
const joiValidator = require("../validators/index");
const {
  UserRegistrationSchema,
  FilterUserSchema,
  ProviderIdSchema
} = require("../validators/UserSchema");

module.exports = function () {
  router.post("/user", joiValidator(UserRegistrationSchema), userCtrl.register);

  router.get(
    "/user/filter/:providerId",
    joiValidator(ProviderIdSchema, "params"),
    joiValidator(FilterUserSchema, "query"),
    userCtrl.getUsers
  );

  return router;
};
