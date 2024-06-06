const express = require("express");
const router = express.Router();

const signInController = require("../controllers/signIn.controller");
router.get("api/users/signin", signInController);

module.exports = router;
