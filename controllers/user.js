const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { firstname, middlename, lastname, email, password } = req.body;

  const isNewUser = await User.isEmailExists(email);
  if (!isNewUser)
    return res.json({ success: false, message: "The email already exists" });

  const user = await User({
    firstname,
    middlename,
    lastname,
    email,
    password,
  });

  await user.save();
  res.json(user);
};

exports.userSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ success: false, message: "user not found" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      mesage: "email and password does not match.",
    });
  res.json({ success: true, user: user });
};
