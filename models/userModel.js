//This file contains the model for the user
const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');



const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Name should be less than 30 characters"],
    minlength: [2, "Name should have more than 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password should be greater than 6 characters"],
  },
  role: {
    type: String,
    required: true,
    minlength: [2, 'Must be greater than 2'],
    enum: ['ADMIN', 'MOD', 'USER']
  },
  bookmarks : {
    type : [String],

  },
  history : {
    type : [String],
  }
}, {
  timestamps: true,
});

//hash password before storing them
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  console.log("pre hash",this.password);
  this.password = await bcrypt.hash(this.password, 10);
  console.log("post hash",this.password);
});

//Generate JWT token for the user
UserSchema.methods.createJWT = function () {
  const token = jwt.sign({ id: this._id }, config.get("JWT_SECRET_KEY"), {
    expiresIn: config.get("JWT_LIFETIME"),
  });
  return token;
};

UserSchema.methods.isPasswordCorrect = async function (inputPassword) {
  const isPasswordMatch = await bcrypt.compare(inputPassword, this.password);
  console.log("is password or not : ",inputPassword,this.password);
  return isPasswordMatch;
};


module.exports = mongoose.model("User", UserSchema);
