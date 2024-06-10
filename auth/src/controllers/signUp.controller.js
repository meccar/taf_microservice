const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const User = require("../models/signUp.model");

const createSendToken = (user, statusCode, req, res) => {
  // const token = signToken(user.id);

  // res.cookie("jwt", token, {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  //   ),
  //   httpOnly: true,
  //   secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  // });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    // token,
    data: {
      user,
    },
  });
};

exports.signUpController = catchAsync(async (req, res) => {
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(user, 201, req, res);
});
