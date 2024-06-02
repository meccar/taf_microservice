const express = require("express");
const https = require("https");
const helmet = require("helmet");
const passport = require("passport");
// const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");

const Config = require("./config/config");
const CreateChannel = require("./config/messages");
const productRoute = require("./routes/product.route");

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

const channel = await CreateChannel();

const ChannelMiddleware = (channel) => {
  return (req, res, next) => {
    req.channel = channel;
    next();
  };
};

app.use("/api/v1/product", ChannelMiddleware(channel), productRoute);

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
