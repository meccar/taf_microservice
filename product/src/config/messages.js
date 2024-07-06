const amqplib = require("amqplib");
const { catchAsync } = require("@tafvn/common");

// create a channel
exports.CreateChannel = catchAsync(async () => {
  const connection = await amqplib.connect(process.env.MESSAGE_BROKER_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(process.env.EXCHANGE_NAME, "direct", {
    durable: false,
  });
  return channel;
});

// publish messages
exports.PublishMessage = catchAsync(async (channel, bindingKey, message) => {
  await channel.publish(
    process.env.EXCHANGE_NAME,
    bindingKey,
    Buffer.from(message),
  );
});

// subcribe messages
exports.SubcribeMessage = catchAsync(async (channel, service, bindingKey) => {
  const appQueue = await channel.assertQueue("QUEUE_NAME");
  channel.bindQueue(appQueue.queue, process.env.EXCHANGE_NAME, bindingKey);
  channel.consume(appQueue.queue, (data) => {
    // console.log("==> Received data");
    // console.log(data.content.toString());
    channel.ack(data);
  });
});
