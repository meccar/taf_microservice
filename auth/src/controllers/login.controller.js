const catchAsync = require("../utils/catchAsync");

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

exports.LoginController = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
  });
});
