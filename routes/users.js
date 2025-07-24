const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

// start with /users

// Get all users
router.get("/", getUsers);

// Get user by ID
router.get("/:userId", getUser);

// Create a new user
router.post("/", createUser);
module.exports = router;
