const express = require("express");
const router = express.Router();

const signUpController = require("../controllers/signUp.controller");
const signUpModel = require("../models/signUp.model");

router.get("api/users/signup", signUpModel, signUpController);

module.exports = router;
