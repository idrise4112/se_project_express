const router = require("express").Router();
const itemRouter = require("./clothingItem");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
// Public Routes
router.post("/signin", login);
router.post("/signup", createUser);

// Protected Routes
router.use("/items", itemRouter);
router.use("/users", userRouter);

// Fallback Route
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found." });
});

module.exports = router;
