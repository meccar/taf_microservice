const express = require("express");
const cookieSession = require("cookie-session");

const currentUserRouter = require("./src/routes/currentUser.route");
const signUpRouter = require("./src/routes/signUp.route");
const signInRouter = require("./src/routes/signIn.route");
const signOutRouter = require("./src/routes/signOut.route");

const ErrorHandler = require("./controllers/error.controller");

const app = express();

const PORT = 8001;

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
