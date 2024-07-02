// Import modules
const https = require("https");
const mongoose = require("mongoose");

const app = require("./index");
const { natsWrapper } = require("@tafvn/common");

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
