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
