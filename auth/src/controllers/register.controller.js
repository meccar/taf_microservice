const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");
const CreateToken = require("./auth.controller");

const RegisterController = catchAsync(async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  CreateToken(user, 201, req, res);
});

module.exports = RegisterController;
