const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
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

// UPDATE
router.put("/:itemId", updateItem);

router.delete("/:itemId", deleteItem);
// READ
router.get("/", getItems);

module.exports = router;
