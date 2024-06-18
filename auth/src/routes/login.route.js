const express = require("express");

const { Validation, Verify } = require("@tafvn/common");
const LoginValidation = require("../models/login.model");
const LoginController = require("../controllers/login.controller");

const router = express.Router();

router.route("/").get(Validation(LoginValidation), Verify, LoginController);

module.exports = router;
