const mongoose = require("mongoose");
const validator = require("validator");
<<<<<<< HEAD
const bcrypt = require("bcryptjs"); // ✅ Import bcrypt
=======
const bcrypt = require("bcryptjs");
const { UnauthorizedError } = require("../utils/errors");
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true, // ✅ Enforces uniqueness at the DB level
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address.",
    },
    unique: true, // ✅ Optional: helps prevent duplicate emails
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters."],
    select: false, // ✅ Prevents password from being returned in queries
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL.",
    },
  },
});

<<<<<<< HEAD
// ✅ Static method must be added after schema is defined
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password") // Include password explicitly
    .then((user) => {
      if (!user) {
        throw new Error("Incorrect email or password");
=======
// Static method for login
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Incorrect email or password");
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
<<<<<<< HEAD
          throw new Error("Incorrect email or password");
        }
=======
          throw new UnauthorizedError("Incorrect email or password");
        }

>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
        return user;
      });
    });
};

<<<<<<< HEAD
module.exports = mongoose.model("user", userSchema);
=======
module.exports = mongoose.model("User", userSchema);
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
