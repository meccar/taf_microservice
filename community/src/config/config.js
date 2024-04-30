const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";
const configFile = `./.env.${env}`;
dotenv.config({ path: configFile });
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};
