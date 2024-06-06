const express = require("express");

const currentUserRouter = require("./src/routes/currentUser.route");
const signInRouter = require("./src/routes/signIn.route");
const signOutRouter = require("./src/routes/signOut.route");
const signUpRouter = require("./src/routes/signUp.route");

const ErrorHandler = require("./controllers/error.controller");

const app = express();

const PORT = 8001;

app.use(express.json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
