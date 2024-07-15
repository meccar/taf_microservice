const { randomBytes } = require("crypto");

const genID = () => {
  return randomBytes(3).toString("hex");
};

module.exports = genID;
