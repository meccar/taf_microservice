const Joi = require("joi");

const usernameMessage = {
  "string.alphanum": "Only alphanumeric characters are accepted",
  "string.empty": "Username is required",
  "string.min": "Username must be at least 3 characters long",
  "string.max": "Username cannot exceed 30 characters",
};

const emailMessage = {
  "string.empty": "Email is required",
  "string.email": "Email must be a valid email address",
};

const passwordMessge = {
  "string.empty": "Password is required",
  "string.pattern.base":
    "Password must be between 12 and 60 characters and contain only letters and numbers",
};

const passwordConfirmMessage = {
  "any.only": "Passwords do not match",
  "string.empty": "Confirm password is required",
};

// Define a schema for user registration
const registerValidation = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages(usernameMessage),
  email: Joi.string().email().required().messages(emailMessage),
  password: Joi.string()
    .trim()
    .pattern(new RegExp("^.{12,60}$"))
    .required()
    .messages(passwordMessge),
  passwordConfirm: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages(passwordConfirmMessage),
});

module.exports = registerValidation;
