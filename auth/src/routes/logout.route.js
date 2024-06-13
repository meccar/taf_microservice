const express = require("express");
const router = express.Router();

const logoutController = require("../controllers/logout.controller");

router.route("/").get(logoutController);

module.exports = router;
