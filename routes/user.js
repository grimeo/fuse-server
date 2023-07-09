const express = require("express");

const router = express.Router();

const { createUser, userSignin } = require("../controllers/user");
const {
  validateUserSignup,
  userValidation,
  validateUserSignIn,
} = require("../middlewares/validation/user");

router.post("/create-user", validateUserSignup, userValidation, createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignin);
module.exports = router;
