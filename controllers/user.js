const jwt = require("jsonwebtoken");
const User = require("../models/user");

const sharp = require("sharp");

const cloudinary = require("../helper/ImageUpload");

exports.createUser = async (req, res) => {
  const { FirstName, MiddleName, LastName, Email, Password } = req.body;

  const isNewUser = await User.isEmailExists(Email);
  if (!isNewUser) {
    return res.json({ success: false, message: "Email already exists" });
  }

  const user = await User({
    FirstName,
    MiddleName,
    LastName,
    Email,
    Password,
  });

  await user.save();
  res.json({ success: true, user });
};

exports.userSignin = async (req, res) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email });

  if (!user) return res.json({ success: false, message: "User not found" });

  const isMatch = await user.comparePassword(Password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "Email and password does not match.",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const userInfo = {
    FirstName: user.FirstName,
    MiddleName: user.MiddleName,
    LastName: user.LastName,
    Email: user.Email,
    Avatar: user.Avatar ? user.Avatar : "",
    isServiceProvider: user.isServiceProvider ? user.isServiceProvider : false,
  };

  res.json({ success: true, user: userInfo, token });
};

exports.uploadProfile = async (req, res) => {
  const { user } = req;
  // console.log(user);
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access" });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      width: 500,
      height: 500,
    });
    const userInfo = await User.findByIdAndUpdate(
      user._id,
      {
        Avatar: result.url,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Your profile is now updated",
      user: userInfo,
    });

    // console.log(user);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error uploading image" });
    console.log("Error while uploading image ", error.message);
  }
};

exports.setTypeOfuser = async (req, res) => {
  const user = req.body.user;
  const userType = req.body.isServiceProvider;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access" });

  try {
    const userInfo = await User.findByIdAndUpdate(
      user._id,
      {
        isServiceProvider: userType,
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "user type is now updated",
      user: userInfo,
    });
    // console.log(user);
  } catch (error) {
    res.status(500).json({ success: false, message: "server error user type" });
    console.log("server error user type ", error.message);
  }
};
