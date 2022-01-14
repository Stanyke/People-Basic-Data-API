const Joi = require("joi");

const UserRegistrationSchema = Joi.object({
  providerId: Joi.string().required(),
  fields: Joi.array()
    .items({
      name: Joi.string().required(),
      age: Joi.number().required(),
      timestamp: Joi.number().required(),
    })
    .required(),
});

const ProviderIdSchema = Joi.object({
  providerId: Joi.string().required(),
});

const FilterUserSchema = Joi.object({
  name: Joi.string(),
  age: Joi.string(),
  timestamp: Joi.string(),
});

module.exports = {
  UserRegistrationSchema,
  FilterUserSchema,
  ProviderIdSchema,
};
