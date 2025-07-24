const router = require("express").Router();
const {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
} = require("../controllers/clothingItem");
// Create a new clothing item

router.post("/", createItem);

// READ
router.get("/", getItems);

// LIKE / UNLIKE
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

// DELETE
router.delete("/:itemId", deleteItem);

module.exports = router;
