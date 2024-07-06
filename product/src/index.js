/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
// const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { catchAsync, ErrorHandler } = require("@tafvn/common");
const productRoute = require("./routes/product.route");
const { CreateChannel } = require("./config/messages");

// const AUTH_OPTIONS = {
//   callbackURL: "/auth/google/callback",
//   clientID: Config.CLIENT_ID,
//   clientSecret: Config.CLIENT_SECRET,
// };

// function verifyCallback(accessToken, refreshToken, profile, done) {
//   console.log("Google profile", profile);
//   done(null, profile);
// }

// passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

const app = express();
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

app.set("trust proxy", true);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const Channel = catchAsync(async (req, res, next) => {
  req.channel = await CreateChannel();
  next();
});

app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: "10kb" }));
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/product", Channel, productRoute);

app.use(ErrorHandler);

module.exports = app;
