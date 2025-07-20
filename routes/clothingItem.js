const router = require("express").Router();
const { createItem, getItems } = require("../controllers/clothingItem");

// starts with /items

//CRUD

//CREATE
router.post("/", createItem); // post request to /items

//READ
router.get("/", getItems);

module.exports = router;
