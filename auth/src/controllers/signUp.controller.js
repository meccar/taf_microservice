const { validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.signUpController = catchAsync(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return next(new AppError("Empty", 400));

  const { email, password } = req.body;

  return res.send({});
});
