const nats = require("node-nats-streaming")
const randomBytes = require("crypto")
const ProductCreatedListener = require("./events/product-created-listener")

const stan = nats.connect("taf", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new ProductCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
