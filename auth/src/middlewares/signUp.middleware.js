const { body } = require("express-validator");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { User, registerValidation } = require("../models/signUp.model");

// exports.signUpModel = [
//   body("email").isEmail().withMessage("Email must be valid"),
//   body("password")
//     .trim()
//     .isLength({ min: 12 })
//     .withMessage("Password must be more than 12 characters"),
// ];

exports.RegisterValidation = catchAsync(async (req, res, next) => {
  const { error } = registerValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details
      .map((detail) => detail.message)
      .join(", ");
    return next(new AppError(errorMessages, 400));
  }

  const existing = await User.findone(req.body.email);

  if (existing) return next(new AppError("Email in use", 400));

  next();
});

// exports.HashPassword = catchAsync(async (req, res, next) => {
//   bcrypt.hash(req.body.password);
// });
