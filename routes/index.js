const router = require("express").Router();
const itemRouter = require("./clothingItem");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");

router.use("/items", itemRouter);

router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found." });
});

module.exports = router;
