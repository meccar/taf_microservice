import nats from "node-nats-streaming";

const stan = nats.connect("taf", "abc", {
  url: "http://localhost:4222",
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
