const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");

exports.signUpController = catchAsync(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.create({ email, password });
  await user.save();

  const usetJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "asdf"
  );

  req.session = {
    jwt: usetJWT,
  };

  return res.status(201).json({
    status: "success",
    data: {
      data: user,
    },
  });
});
