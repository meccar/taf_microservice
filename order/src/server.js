// Import modules
const https = require("https");
const mongoose = require("mongoose");
const session = require("express-session");

const app = require("./index");
const { natsWrapper, redisManager } = require("@tafvn/common");
const { sessionOption, redisOption } = require("./utils/options")

// Replace placeholder in MongoDB connection URL with actual password
const url = process.env.MONGODB_URI.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

// Define async function to start the application
async function start() {
  try {
    // Connect to NATS streaming server
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // Handle NATS connection close event
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    // Gracefully close NATS connection on process termination signals
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // Configure cookie sessions
    await redisManager.connect(redisOption);
    app.use(session(sessionOption));

    // Connect to MongoDB
    await mongoose.connect(url).then(() => console.log("Connected to MongoDB"));

    // Create HTTPS server and listen on the specified port
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
    // Log any errors that occur during startup
    console.error(err);
  }
}

// Start the application
start();
