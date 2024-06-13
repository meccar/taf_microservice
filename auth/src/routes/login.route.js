const express = require("express");

const Validation = require("../utils/validation");
const Verify = require("../middlewares/verify.middleware");
const LoginValidation = require("../models/login.model");
const LoginController = require("../controllers/login.controller");

const router = express.Router();

router.route("/").get(Validation(LoginValidation), Verify, LoginController);

module.exports = router;
