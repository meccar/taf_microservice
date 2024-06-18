const express = require("express");

const Validation = require("@tafvn/common");
const RegisterController = require("../controllers/register.controller");
const registerValidation = require("../models/register.model");

const router = express.Router();

router.route("/").post(Validation(registerValidation), RegisterController);

module.exports = router;
