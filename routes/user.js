const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  createUser,
  userSignin,
  uploadProfile,
} = require("../controllers/user");
const {
  validateUserSignup,
  userValidation,
  validateUserSignIn,
} = require("../middlewares/validation/user");
const { isAuth } = require("../middlewares/auth");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file", false);
  }
};

const uploads = multer({ storage, fileFilter });

router.post("/create-user", validateUserSignup, userValidation, createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignin);
router.post(
  "/upload-profile",
  isAuth,
  uploads.single("profile"),
  uploadProfile
);

module.exports = router;
