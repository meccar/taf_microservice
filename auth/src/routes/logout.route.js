const express = require("express");
const router = express.Router();

const VerifyToken = require("../middlewares/auth.middleware");
const logoutController = require("../controllers/logout.controller");

router.route("/").get(VerifyToken, logoutController);

module.exports = router;
