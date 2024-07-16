const nats = require("node-nats-streaming")
const ProductCreatedPublisher = require("./events/product-created-publisher")

const stan = nats.connect("taf", "abc", {
  url: "http://localhost:4222",
  // connectTimeout: 5000, // 5 seconds
  // pingInterval: 10000, // 10 seconds
  // maxPingOut: 5,
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new ProductCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "Phone",
      price: 20,
    });
  } catch (err) {
    console.log(err);
  }
});

stan.on("close", () => {
  console.warn("NATS connection closed");
});

stan.on("connection_lost", (err) => {
  console.error("NATS connection lost:", err);
});

stan.on("error", (err) => {
  console.error("NATS connection error:", err);
});

stan.on("disconnect", () => {
  console.warn("NATS connection disconnected");
});

stan.on("reconnecting", () => {
  console.info("NATS client reconnecting");
});
