const express = require("express");

const Validation = require("../middlewares/validation.middleware");
const LoginValidation = require("../models/login.model");
const { LoginController } = require("../controllers/login.controller");

const router = express.Router();

router.route("/").get(Validation(LoginValidation), LoginController);

module.exports = router;
