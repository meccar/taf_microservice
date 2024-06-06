const body = require("express-validator");

(exports.signInController = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 12 })
    .withMessage("Password must be more than 12 characters"),
]),
  (req, res) => {
    const { email, password } = req.body;

    if (!email || typeof email !== "string") {
      res.status(400).send();
    }
    return res.send("Hi");
  };
