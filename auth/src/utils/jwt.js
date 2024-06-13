const jwt = require("jsonwebtoken");
const Config = require("../config/config");

exports.GenerateToken = (id) => {
  const payload = {
    sub: id,
    iat: Date.now(),
  };

  return jwt.sign(payload, Config.privateKey, Config.option);
};

exports.decodedToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
