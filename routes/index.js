const router = require("express").Router();

const clothingItem = require("./clothingItem");
const userRouter = require("./users");

router.use("/users", userRouter);

module.exports = router;
