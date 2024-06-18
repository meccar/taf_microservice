const express = require("express");
const router = express.Router();

const User = require("../controllers/user.controller");
const VerifyToken = require("../middlewares/auth.middleware");

router.route("/").get(VerifyToken, User);

module.exports = router;
