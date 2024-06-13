const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// const currentUserRoute = require("./routes/currentUser.route");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
// const signOutRoute = require("./routes/signOut.route");

const ErrorHandler = require("./controllers/error.controller");

const app = express();

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
    secure: true,
  }),
);

// app.use("api/users/currentUser", currentUserRoute);
app.use("/api/v1/user/register", registerRoute);
app.use("/api/v1/user/login", loginRoute);
// app.use(signOutRoute);

app.use(ErrorHandler);

module.exports = app;
