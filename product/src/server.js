const https = require("https");
const mongoose = require("mongoose");

const Config = require("./config/config");
const app = require("./index");
const { natsWrapper } = require("./nats-wrapper");

const url = Config.MONGODB.replace("<password>", Config.MONGODB_PASSWORD);

/* eslint-disable no-console */
/* eslint-disable no-process-exit */

natsWrapper.connect("taf", "rwefsd", "http://nats-srv:4222");
natsWrapper.client.on("close", () => {
  console.log("NATS connection closed!");
  process.exit(1);
});

process.on("SIGINT", () => natsWrapper.client.close());
process.on("SIGTERM", () => natsWrapper.client.close());

mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

https
  .createServer(
    {
      key: Config.key,
      cert: Config.cert,
    },
    app,
  )
  .listen(Config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on ${Config.PORT}`);
  });
