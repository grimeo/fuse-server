const mongoose = require("mongoose");

const user = {
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  password: "",
  imageId: "",
  avatar: "",
};

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: Buffer,
    required: false,
  },
});

userSchema.statics.isEmailExists = async function (email) {
  if (!email) throw new Error("Invalid email");
  try {
    const user = await this.findOne({ email });
    if (user) return false;
    return true;
  } catch (error) {
    console.log("error in isEmailExists funcion", error.message);
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
