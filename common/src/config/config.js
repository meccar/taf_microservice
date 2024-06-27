const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const loadEnv = (serviceName) => {
  const env = process.env.NODE_ENV || "development";
  const configFile = path.resolve(
    __dirname,
    `../../${serviceName}/.env.${env}`,
  );

  if (fs.existsSync(configFile)) {
    dotenv.config({ path: configFile });
  } else {
    console.warn(`Config file ${configFile} not found`);
  }

  return {
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
    EXCHANGE_NAME: process.env.EXCHANGE_NAME || "ONLINE SHOPPING",
    SHOPPING_BINDING_KEY:
      process.env.SHOPPING_BINDING_KEY || "SHOPPING_SERVICE",
    CUSTOMER_BINDING_KEY:
      process.env.CUSTOMER_BINDING_KEY || "CUSTOMER_SERVICE",
    privateKey: process.env.PRIVATE_KEY || "privateKey",
    option: {
      algorithm: "RS256",
      expiresIn: process.env.JWT_COOKIE_EXPIRY,
    },
    //   key: fs.readFileSync(path.join(__dirname, "../..", "key.pem"), "utf8"),
    //   cert: fs.readFileSync(path.join(__dirname, "../..", "cert.pem"), "utf8"),
  };
};

module.exports = { loadEnv };
