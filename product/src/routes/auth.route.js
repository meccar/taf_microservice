const express = require("express");

const router = express.Router({ mergeParams: true });
const passport = require("passport");

router.get(
  "auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  }),
);

router.get(
  "auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
);

router.get("auth/logout");

router.get("/failure");
