const mongoose = require("mongoose");
const clothingItem = require("../models/clothingItem");

// POST /items
const createItem = (req, res) => {
  console.log("Request body:", req.body);
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log("Created item:", item);
      res.status(201).send({ data: item });
    })
    .catch((e) => {
      console.error("Error from createItem:", e);
      if (e.name === "ValidationError") {
        return res.status(400).send({ message: e.message });
      }
      return res
        .status(500)
        .send({ message: "Error from createItem", error: e.message });
    });
};

// GET /items
const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((e) => {
      console.error("Error from getItems:", e);
      return res
        .status(500)
        .send({ message: "Error from getItems", error: e.message });
    });
};

// PATCH /items/:itemId
const updateItem = async (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  try {
    const updatedItem = await clothingItem
      .findByIdAndUpdate(itemId, { $set: { imageUrl } }, { new: true })
      .orFail();

    return res.status(200).send({ data: updatedItem });
  } catch (err) {
    console.error("Error from updateItem:", err);
    return next(err);
  }
};

// LIKE /items/:itemId/likes
const likeItem = async (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  try {
    const updatedItem = await clothingItem.findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: userId } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send({ message: "Item not found" });
    }

    return res.send({ data: updatedItem });
  } catch (err) {
    console.error("Error from likeItem:", err);
    return next(err);
  }
};

// UNLIKE /items/:itemId/likes
const unlikeItem = async (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  try {
    const updatedItem = await clothingItem.findByIdAndUpdate(
      itemId,
      { $pull: { likes: userId } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send({ message: "Item not found" });
    }

    return res.send({ data: updatedItem });
  } catch (err) {
    console.error("Error from unlikeItem:", err);
    return next(err);
  }
};

// ✅ Export all functions
module.exports = {
  createItem,
  getItems,
  updateItem,
  likeItem,
  unlikeItem,
};
