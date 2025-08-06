const router = require("express").Router();
const itemRouter = require("./clothingItem");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const auth = require("../middlewares/auth");

// Public Routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", itemRouter);

// Protect all routes after this
router.use(auth);

// Protected Routes
router.use("/items", itemRouter);
router.use("/users", userRouter);

// Fallback Route
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found." });
});

module.exports = router;
