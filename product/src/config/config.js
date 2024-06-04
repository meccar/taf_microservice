const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const configFile = `./.env.${env}`;
dotenv.config({ path: configFile });

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
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
  key: fs.readFileSync(path.join(__dirname, "../..", "key.pem"), "utf8"),
  cert: fs.readFileSync(path.join(__dirname, "../..", "cert.pem"), "utf8"),
};

// module.exports = class kafkaConfig {
//   constructor() {
//     this.Kafka = new Kafka({
//       clientId: "nodejs-kafka",
//       brokers: ["localhost:9093"],
//     });
//     this.producer = this.Kafka.producer();
//     this.consumer = this.Kafka.consumer({ groupId: "test-group" });

//     this.produce = catchAsync(async (topic, messages) => {
//       await this.producer.connect();
//       await this.producer.send({
//         topic,
//         messages,
//       });

//       await this.producer.disconnect();
//     });

//     this.consume = catchAsync(async (topic, callback) => {
//       await this.consumer.connect();
//       await this.consumer.subscribe({
//         topic,
//         fromBeginning: true,
//       });
//       await this.consumer.run({
//         matchMessage: async ({ topic, partition, message }) => {
//           const value = message.value.toString();
//           callback(value);
//         },
//       });
//       await this.consumer.disconnect();
//     });
//   }
// };
