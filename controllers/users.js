const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const handleError = require("../utils/handleError");
const { JWT_SECRET } = require("../utils/config");

// Helper to sanitize user object
const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      const sanitizedUsers = users.map(sanitizeUser);
      res.status(200).send(sanitizedUsers);
    })
    .catch((err) => handleError(err, res));
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(sanitizeUser(user)))
    .catch((err) => handleError(err, res));
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((updatedUser) => res.status(200).send(sanitizeUser(updatedUser)))
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({ name, avatar, email, password: hashedPassword });
    })
    .then((user) => res.status(201).send(sanitizeUser(user)))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({ message: "Email already exists." });
      }
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      res.status(401).send({ message: "Incorrect email or password." });
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
