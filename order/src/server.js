const https = require("https");
const mongoose = require("mongoose");

const app = require("./index");
const { natsWrapper } = require("@tafvn/common");

const url = process.env.MONGODB.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

async function start() {
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

    https
      .createServer(
        {
          key: Config.key,
          cert: Config.cert,
        },
        app
      )
      .listen(Config.PORT, () => {
        console.log(`Server is listening on ${Config.PORT}`);
      });
  } catch (err) {
    console.error(err);
  }
}

start();
