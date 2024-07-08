// Import modules
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");

// Import routes and error handler
const orderRoute = require("./routes/order.route");
// const {redisClient} = require("./utils/redis")
const { ErrorHandler, RedisManager } = require("@tafvn/common");

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
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Configure cookie sessions
app.use(
  session({
    store: RedisManager.getRedisStore(),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    }
  })
);

await redisClient()

// Set up order route
app.use("/api/v1/user/order", orderRoute);

// Use custom error handler middleware
app.use(ErrorHandler);

// Export the app module
module.exports = app;
