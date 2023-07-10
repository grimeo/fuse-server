const express = require("express");

const router = express.Router();

const { createUser, userSignin } = require("../controllers/user");
const {
  validateUserSignup,
  userValidation,
  validateUserSignIn,
} = require("../middlewares/validation/user");
const { isAuth } = require("../middlewares/auth");

const User = require("../models/user");

const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();

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
  async (req, res) => {
    const { user } = req;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "unauthorized access" });

    try {
      const profileBuffer = req.file.buffer;
      const { width, height } = await sharp(profileBuffer).metadata();
      const avatar = await sharp(profileBuffer)
        .resize(Math.round(width * 0.5), Math.round(height * 0.5))
        .toBuffer();

      await User.findByIdAndUpdate(user._id, { avatar });
      res
        .status(201)
        .json({ success: true, message: "Your profile is now updated" });

      console.log(user._id, avatar);
    } catch (error) {
      res
        .status(500)
        .json({ sucess: false, message: "server error uploading image" });
      console.log("Error while uploading image ", error.message);
    }
  }
);

module.exports = router;
