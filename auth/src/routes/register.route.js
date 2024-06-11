const express = require("express");

const Validation = require("../middlewares/validation.middleware");
const RegisterController = require("../controllers/register.controller");
const { registerValidation } = require("../models/register.model");

const router = express.Router();

router.route("/").post(Validation(registerValidation), RegisterController);

module.exports = router;
