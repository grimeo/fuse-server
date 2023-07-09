const express = require("express");

const router = express.Router();

const { createUser } = require("../controllers/user");
const {
  validateUserSignup,
  userValidation,
} = require("../middlewares/validation/user");

router.post("/create-user", validateUserSignup, userValidation, createUser);

module.exports = router;
