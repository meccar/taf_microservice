import nats from "node-nats-streaming";

const stan = nats.connect("taf", "abc", {
  url: "http://localhost:4222",
  // connectTimeout: 5000, // 5 seconds
  // pingInterval: 10000, // 10 seconds
  // maxPingOut: 5,
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

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "123",
    name: "object",
    price: 20,
  });

  stan.publish("taf:created", data, () => {
    console.log("Event published");
  });
});

stan.on("close", () => {
  console.warn("NATS connection closed");
});

stan.on("connection_lost", (err) => {
  console.error("NATS connection lost:", err);
});
