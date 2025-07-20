const router = require("express").Router();
const itemRouter = require("./clothingItem");
const userRouter = require("./users");

// any request that starts with /items is routed to /routes/clothingItem.js
router.use("/items", itemRouter);

// any request that start with /users should be routed to /routes/users.js
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
