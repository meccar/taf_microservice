const passport = require("passport")

app.get("auth/google", passport.authenticate("google", { 
    scope: ["email"],
}));

app.get("auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
}), (req, res) => {
    console.log("test")
})

app.get("auth/logout")

app.get("/failure")