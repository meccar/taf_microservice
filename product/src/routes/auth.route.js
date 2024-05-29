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
    session: true,
  }),
);

router.get("auth/logout", (req) => {
  req.logout();
});

router.get("/failure");

module.export = router;
