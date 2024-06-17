const Config = require("../config/config");
const GenerateToken = require("../utils/jwt");

exports.CreateToken = (user, statusCode, req, res) => {
  const token = GenerateToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + Config.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  req.session = {
    jwt: token,
  };

  // Remove password from output
  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    // token,
    data: {
      user,
    },
  });
};
