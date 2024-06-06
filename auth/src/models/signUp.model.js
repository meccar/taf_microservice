const { body } = require("express-validator");

exports.signUpModel = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 12 })
    .withMessage("Password must be more than 12 characters"),
];
