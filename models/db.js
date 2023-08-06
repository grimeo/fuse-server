const mongoose = require("mongoose");

mongoose
  .connect(process.env.USERSDB_MONGO_URI)
  .then(() => {
    console.log("Database connnected");
  })
  .catch((err) => {
    console.log(err.message);
  });
