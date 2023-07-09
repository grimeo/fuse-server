require("dotenv").config();
require("./models/db");
const express = require("express");

const app = express();

const User = require("./models/user");

app.post("/create-user", async (req, res) => {
  const user = await User({
    firstname: "john",
    middlename: "john",
    lastname: "john",
    email: "example5s@email.com",
    password: "pass1234",
  });

  const isNewUser = await User.isEmailExists("example5s@email.com");
  if (!isNewUser)
    return res.json({ success: false, message: "The email already exists" });
  User.isEmailExists();
  await user.save();
  res.json(user);
});

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
