const Joi = require("joi");

const usernameMessage = {
  "string.alphanum": "Only alphanumeric characters are accepted",
  "string.empty": "Username is required",
};

const emailMessage = {
  "string.empty": "Email is required",
  "string.email": "Email must be a valid email address",
};

const passwordMessge = {
  "string.empty": "Password is required",
};

const LoginValidation = Joi.object({
  username: Joi.string().alphanum().required().messages(usernameMessage),
  email: Joi.string().email().required().messages(emailMessage),
  password: Joi.string().trim().required().messages(passwordMessge),
});

module.exports = { LoginValidation };
