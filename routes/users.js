const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
<<<<<<< HEAD
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

=======

// Get current user
router.get("/me", getCurrentUser);

// Update current user's profile
router.patch("/me", updateUser);

>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
module.exports = router;
