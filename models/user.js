const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = {
  FirstName: "",
  MiddleName: "",
  LastName: "",
  Email: "",
  Password: "",
  ImageId: "",
  Avatar: "",
};

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  MiddleName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  isServiceProvider: { type: Boolean },
  Avatar: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("Password")) {
    bcrypt.hash(this.Password, 8, (err, hash) => {
      if (err) return next(err);
      this.Password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (Password) {
  if (!Password) throw new Error("Password is missing, cannot compare");
  try {
    const result = await bcrypt.compare(Password, this.Password);
    return result;
  } catch (error) {
    console.log("Error while comparing password. ", error.message);
  }
};

userSchema.statics.isEmailExists = async function (email) {
  if (!email) throw new Error("Invalid email");
  try {
    const user = await this.findOne({ Email: email });
    console.log("email exists", email);
    if (user) return false;
    return true;
  } catch (error) {
    console.log("error in isEmailExists funcion", error.message);
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
