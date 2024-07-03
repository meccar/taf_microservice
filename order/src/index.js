// Import modules
const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");

// Import routes and error handler
const orderRoute = require("./routes/order.route");
const {redisClient} = require("./utils/redis")
const { ErrorHandler } = require("@tafvn/common");

// Initialize express app
const app = express();

// Set environment variable
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

// Trust proxy settings for secure cookies
app.set("trust proxy", true);

// Use morgan for logging in development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Use Helmet to secure HTTP headers
app.use(helmet());

// Enable CORS for cross-origin requests
app.use(cors());

// Parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: "10kb" }));

// Configure cookie sessions
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "development",
  })
);

await redisClient()

// Set up order route
app.use("/api/v1/user/order", orderRoute);

// Use custom error handler middleware
app.use(ErrorHandler);

// Export the app module
module.exports = app;
