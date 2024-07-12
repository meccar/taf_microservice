const https = require("https");
const mongoose = require("mongoose");
const session = require("express-session");

const app = require("./index");
const { natsWrapper, redisManager } = require("@tafvn/common");
// const { sessionOption, redisOption } = require("./utils/options");
const { sessionOption, redisOption } = require("@tafvn/common");


const url = process.env.MONGODB.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

// const config = {
//   username: "default",
//   password: "secret",
//   socket: {
//     host: "my-redis.cloud.redislabs.com",
//     port: 6379,
//     tls: true,
//     key: fs.readFileSync("./redis_user_private.key"),
//     cert: fs.readFileSync("./redis_user.crt"),
//     ca: [fs.readFileSync("./redis_ca.pem")],
//   },
// };

/* eslint-disable no-console */
/* eslint-disable no-process-exit */
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

    // Configure cookie sessions
    await redisManager.connect(redisOption);
    app.use(session(sessionOption));

    await mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

    https
      .createServer(
        {
          key: process.env.key,
          cert: process.env.cert,
        },
        app
      )
      .listen(process.env.PORT, () => {
        console.log(`Server is listening on ${process.env.PORT}`);
      });
  } catch (err) {
    console.error(err);
  }
}

start();
