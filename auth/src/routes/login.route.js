const express = require("express");

const { Validation, Verify } = require("@tafvn/common");
const LoginValidation = require("../models/login.model");
const LoginController = require("../controllers/login.controller");
const User = require("../models/user.model");

const router = express.Router();

router
  .route("/")
  .get(Validation(LoginValidation), Verify(User), LoginController);

module.exports = router;
