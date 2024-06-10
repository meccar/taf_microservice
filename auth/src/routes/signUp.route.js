const express = require("express");

const { signUpController } = require("../controllers/signUp.controller");
const {
  signUpModel,
  RegisterValidation,
} = require("../middlewares/signUp.middleware");

const router = express.Router();

router.route("/").post(signUpModel, RegisterValidation, signUpController);

module.exports = router;
