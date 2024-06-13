const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const configFile = `./.env.${env}`;
dotenv.config({ path: configFile });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_COOKIE_EXPIRY: process.env.JWT_COOKIE_EXPIRY,
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB: process.env.MONGODB,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "ONLINE SHOPPING",
  SHOPPING_BINDING_KEY: "SHOPPING_SERVICE",
  CUSTOMER_BINDING_KEY: "CUSTOMER_SERVICE",
  //   key: fs.readFileSync(path.join(__dirname, "../..", "key.pem"), "utf8"),
  //   cert: fs.readFileSync(path.join(__dirname, "../..", "cert.pem"), "utf8"),
};
