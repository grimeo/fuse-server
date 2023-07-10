const express = require("express");

const router = express.Router();

const { createUser, userSignin } = require("../controllers/user");
const {
  validateUserSignup,
  userValidation,
  validateUserSignIn,
} = require("../middlewares/validation/user");
const { isAuth } = require("../middlewares/auth");

router.post("/create-user", validateUserSignup, userValidation, createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignin);
router.post("/create-post", isAuth, (req, res) => {
  res.send("welcome to secret route");
});

module.exports = router;
