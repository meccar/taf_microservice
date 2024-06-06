const express = require("express");
const router = express.Router();

const signOutController = require("../controllers/signOut.controller");

router.get("api/users/signout", signOutController);

module.exports = router;
