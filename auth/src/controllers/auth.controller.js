const Config = require("../config/config");

exports.CreateToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + Config.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

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
