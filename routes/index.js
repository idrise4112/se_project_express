const router = require("express").Router();
const itemRouter = require("./clothingItem");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const auth = require("../middlewares/auth");

// Public Routes
router.post("/signin", login);
router.post("/signup", createUser);
<<<<<<< HEAD
=======

// Protect all routes after this
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
router.use(auth);
router.get("/items", itemRouter);

// Protected Routes
router.use("/items", itemRouter);
router.use("/users", userRouter);

// Fallback Route
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found." });
});

module.exports = router;
