const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.signUpController = catchAsync(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return next(new AppError("Empty", 400));

  const { email, password } = req.body;

  const existingUser = await User.findone({ email });

  if (existingUser) return next(new AppError("Email in use", 400));

  const user = await User.create({ email, password });
  await user.save();

  const usetJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "asdf",
  );

  req.session = {
    jwt: usetJWT,
  };

  return res.send({});
});
