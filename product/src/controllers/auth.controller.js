const passport = require("passport");
const {Strategy} = require("passport-google-oauth20")

const AUTH_OPTIONS = {
    callbackURL: "/auth/google/callback",
    clientID: Config.CLIENT_ID,
    clientSecret: Config.CLIENT_SECRET,
  }
  
  function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log("Google profile", profile);
    done(null, profile)
  }

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback) )

module.exports = passport
