const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
} = require("../controllers/clothingItem");

// starts with /items

// CRUD

// CREATE
router.post("/", createItem); // post request to /items

// UPDATE
router.patch("/:itemId", updateItem); // PATCH /items/:itemId
// READ
router.get("/", getItems);

module.exports = router;
