const dotenv = require("dotenv");
// const { Kafka } = require("kafkajs");
// const catchAsync = require("../utils/catchAsync");

const env = process.env.NODE_ENV || "development";
const configFile = `./.env.${env}`;
dotenv.config({ path: configFile });

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
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
