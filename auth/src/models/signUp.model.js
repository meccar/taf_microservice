const { body } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const usernameMessage = {
  "string.alphanum": "Only alphabets and numbers are accepted",
  "string.empty": "Username is required",
  "string.min": "Username must be at least 3 characters long",
  "string.max": "Username cannot exceed 30 characters",
};

const emailMessage = {
  "string.empty": "Email is required",
  "string.email": "Email must be a valid email address",
};

const passwordMessge = {
  "string.empty": "Password is required",
  "string.pattern.base":
    "Password must be between 12 and 60 characters and contain only letters and numbers",
};

const confirmPasswordMessage = {
  "any.only": "Passwords do not match",
  "string.empty": "Confirm password is required",
};

// Define a schema for user registration
exports.registerValidation = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages(usernameMessage),
  email: Joi.string().email().required().messages(emailMessage),
  password: Joi.string()
    .strip()
    .pattern(new RegExp("^.{12,60}$"))
    .required()
    .messages(passwordMessge),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages(confirmPasswordMessage),
});

exports.signUpModel = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 12 })
    .withMessage("Password must be more than 12 characters"),
];

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

UserSchema.pre("save", async function (next) {
  // Only run this func if password was modified
  if (!this.isModified("password")) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // this.passwordConfirm = undefined;
  next();
});

exports.User = mongoose.model("User", UserSchema);
