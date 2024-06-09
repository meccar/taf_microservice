const express = require("express");

const User = require("../models/signUp.model");
const { signUpController } = require("../controllers/signUp.controller");
const {
  signUpModel,
  CheckValidation,
} = require("../middlewares/signUp.middleware");

const router = express.Router();

router.route("/").post(signUpModel, CheckValidation(User), signUpController);

module.exports = router;
