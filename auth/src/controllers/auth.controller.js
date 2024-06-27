const { GenerateToken } = require("../utils/jwt");

const CreateToken = (user, statusCode, req, res) => {
  const token = GenerateToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
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

module.exports = CreateToken;
