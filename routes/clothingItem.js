const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// LIKE an item
router.put("/:itemId/likes", likeItem);

// UNLIKE an item
router.delete("/:itemId/likes", unlikeItem);

// CREATE
router.post("/", createItem);

// UPDATE
router.put("/:itemId", updateItem);

// READ
router.get("/", getItems);

module.exports = router;
