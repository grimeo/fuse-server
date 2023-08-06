require("dotenv").config();
require("./models/db");
const express = require("express");

const app = express();

const User = require("./models/user");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend!" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
