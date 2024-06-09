const express = require("express");
const cookieSession = require("cookie-session");

// const currentUserRoute = require("./routes/currentUser.route");
const signUpRoute = require("./routes/signUp.route");
// const signInRoute = require("./routes/signIn.route");
// const signOutRoute = require("./routes/signOut.route");

const ErrorHandler = require("./controllers/error.controller");

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// app.use("api/users/currentUser", currentUserRoute);
// app.use("api/users/signup", signUpRoute);
// app.use(signInRoute);
// app.use(signOutRoute);

app.use(ErrorHandler);

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

module.exports = app;
