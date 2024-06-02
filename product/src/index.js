const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
// const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");

const productRoute = require("./routes/product.route");
const Config = require("./config/config");
const catchAsync = require("./utils/catchAsync");
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

const Channel = catchAsync(async (req, res, next) => {
  req.channel = await CreateChannel();
  next();
});

const app = express();

app.use(helmet());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [Config.COOKIE_KEY_1, Config.COOKIE_KEY_2],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/api/v1/product", Channel, productRoute);

module.exports = app;
