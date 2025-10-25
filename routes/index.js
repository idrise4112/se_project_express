const router = require("express").Router();
const itemRouter = require("./clothingItem");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const { celebrate, Joi } = require("celebrate");
const NotFoundError = require("../errors/NotFoundError");

// Public Routes with validation
router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(), // ← Added .min(6)
    }),
  }),
  login
);

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(), // ← Added .min(6)
    }),
  }),
  createUser
);

// Protected Routes
router.use("/items", itemRouter);
router.use("/users", userRouter);

// Fallback Route

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found."));
});
module.exports = router;
