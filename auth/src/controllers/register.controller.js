const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");

const RegisterController = catchAsync(async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // createSendToken(user, 201, req, res);
  return res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

module.exports = RegisterController;
