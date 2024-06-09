const { body } = require("express-validator");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.signUpModel = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 12 })
    .withMessage("Password must be more than 12 characters"),
];

exports.CheckValidation = (Model) =>
  catchAsync(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return next(new AppError("Empty", 400));

    const existing = await Model.findone(req.body.email);

    if (existing) return next(new AppError("Email in use", 400));

    next();
  });
