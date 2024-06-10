const express = require("express");
const router = express.Router();

const currentUserController = require("../controllers/currentUser.controller");

router.route("/").get(currentUserController);

module.exports = router;
