const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const Config = require("../config/config");

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: Config.CLIENT_ID,
  clientSecret: Config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});

module.exports = passport;
