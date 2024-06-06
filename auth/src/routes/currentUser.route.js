const express = require("express");
const router = express.Router();

const currentUserController = require("../controllers/currentUser.controller");

router.get("api/users/currentUser", currentUserController);

module.exports = router;
