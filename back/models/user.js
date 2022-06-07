const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validateEmail,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
