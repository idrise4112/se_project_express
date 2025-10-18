const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");

const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.status(200).json(sanitizeUser(user)))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID format"));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me
const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("User not found"))
    .then((updatedUser) => res.status(200).json(sanitizeUser(updatedUser)))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid user data"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID format"));
      } else {
        next(err);
      }
    });
};

// POST /signup
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError("Email already exists");
      }

      return bcrypt
        .hash(password, 10)
        .then((hashedPassword) =>
          User.create({ name, avatar, email, password: hashedPassword })
        );
    })
    .then((user) => res.status(201).json(sanitizeUser(user)))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid user data"));
      } else {
        next(err);
      }
    });
};

// POST /signin
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).json({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
