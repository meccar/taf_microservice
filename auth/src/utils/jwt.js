const jwt = require("jsonwebtoken");

const GenerateToken = (id) => {
  const option = {
    algorithm: "RS256",
    expiresIn: process.env.JWT_COOKIE_EXPIRY,
  };

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  return jwt.sign(payload, process.env.privateKey, option);
};

exports.decodedToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};

module.exports = { GenerateToken };
