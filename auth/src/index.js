const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

// const currentUserRoute = require("./routes/currentUser.route");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const userRoute = require("./routes/user.route");
const logoutRoute = require("./routes/logout.route");
const { ErrorHandler } = require("@tafvn/common");

const app = express();
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

app.set("trust proxy", true);

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: "10kb" }));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "development",
  })
);

app.use("/api/v1/user/register", registerRoute);
app.use("/api/v1/user/login", loginRoute);
app.use("/api/v1/user/currentUser", userRoute);
app.use("/api/v1/user/logout", logoutRoute);
// app.use("api/users/currentUser", protectedRoute);

app.use(ErrorHandler);

module.exports = app;
