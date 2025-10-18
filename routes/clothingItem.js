const router = require("express").Router();
const {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation"); //  Import validators

// starts with /items

router.get("/", getItems);

router.post("/", auth, validateCardBody, createItem); //  Validate item body
router.put("/:itemId/likes", auth, validateId, likeItem); //  Validate itemId
router.delete("/:itemId/likes", auth, validateId, unlikeItem); //  Validate itemId
router.delete("/:itemId", auth, validateId, deleteItem); //  Validate itemId

module.exports = router;
