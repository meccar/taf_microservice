const express = require("express");
const router = express.Router();

const VerifyToken = require("@tafvn/common");
const logoutController = require("../controllers/logout.controller");

router.route("/").get(VerifyToken, logoutController);

module.exports = router;
