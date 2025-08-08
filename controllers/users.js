const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT,
} = require("../utils/errors");

<<<<<<< HEAD
=======
// Helper to sanitize user object
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
<<<<<<< HEAD
=======
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).json(users.map(sanitizeUser)))
    .catch(next);
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .orFail()
    .then((user) => res.status(OK).json(sanitizeUser(user)))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((updatedUser) => res.status(OK).json(sanitizeUser(updatedUser)))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Email and password are required." });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(CONFLICT).json({ message: "Email already exists." });
      }

      return bcrypt
        .hash(password, 10)
        .then((hashedPassword) =>
          User.create({ name, avatar, email, password: hashedPassword })
<<<<<<< HEAD
        )
        .then((user) => {
          return res.status(CREATED).json(sanitizeUser(user));
        });
    })
=======
        );
    })
    .then((user) => res.status(CREATED).json(sanitizeUser(user)))
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Email and password are required." });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(OK).json({ token });
    })
<<<<<<< HEAD
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .json({ message: "Incorrect email or password." });
      }
      return next(err);
    });
};

module.exports = {
=======
    .catch(() =>
      res.status(UNAUTHORIZED).json({ message: "Incorrect email or password." })
    );
};

module.exports = {
  getUsers,
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
