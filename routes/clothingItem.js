const router = require("express").Router();
const {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
} = require("../controllers/clothingItem");

// LIKE an item
router.put("/:itemId/likes", likeItem);

// UNLIKE an item
router.delete("/:itemId/likes", unlikeItem);

// CREATE
router.post("/", createItem);

router.delete("/:itemId", deleteItem);
// READ
router.get("/", getItems);

module.exports = router;
