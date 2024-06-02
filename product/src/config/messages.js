const catchAsync = require("../utils/catchAsync");
const amqplib = require("amqplib");

// create a channel
module.exports.CreateChannel = catchAsync(async () => {
  const connection = await amqplib.connect(MESSAGE_BROKER_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, "direct", false);
  return channel;
});

// publish messages
module.exports.PublishMessage = catchAsync(
  async (channel, binding_key, message) => {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  },
);

// subcribe messages
module.exports.SubcribeMessage = catchAsync(
  async (channel, service, binding_key) => {
    const appQueue = await channel.assertQueue("QUEUE_NAME");
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
    channel.consume(appQueue.queue, (data) => {
      console.log("==> Received data");
      console.log(data.content.toString());
      channel.ack(data);
    });
  },
);
