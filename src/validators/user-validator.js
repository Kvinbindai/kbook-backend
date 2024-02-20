const Joi = require("joi");
const createError = require("http-errors");

const addUserSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .error(createError(400, "firstname is required")),
  lastName: Joi.string()
    .trim()
    .required()
    .error(createError(400, "lastname is required")),
  email: Joi.string()
    .trim()
    .email({ allowFullyQualified: true })
    .error(createError(400, "email is required")),
  password: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-z0-9]{6,}$/)
    .error(createError(400, "password is required")),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "confirm password is required",
    "any.only": "password and confirm password must be match",
  }),
  phoneNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9]{10}$/)
    .error(createError(400, "phone number is required")),
  role: Joi.string().optional(),
});

const loginUserSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ allowFullyQualified: true })
    .error(createError(400, "email is required")),
  password: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-z0-9]{6,}$/)
    .error(createError(400, "password is required")),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base": "PhoneNumber must be a Number and 10 characters",
    }),
  profileImage: Joi.string().optional(),
});

module.exports = { addUserSchema, loginUserSchema, updateUserSchema };
