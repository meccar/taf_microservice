import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
const stan = nats.connect("taf", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

const options = stan.subscriptionOptions().setManualAckMode(true);

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const substription = stan.subscribe(
    "taf:created",
    "productServiceQueueGroup"
  );

  substription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});
