const clothingItem = require("../models/clothingItem");
const handleError = require("../utils/handleError");

// POST /items
const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => handleError(err, res));
};

// GET /items
const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => handleError(err, res));
};

// LIKE /items/:itemId/likes
const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail()
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch((err) => handleError(err, res));
};

// UNLIKE /items/:itemId/likes
const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch((err) => handleError(err, res));
};

// DELETE /items/:itemId —
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((deletedItem) => res.status(200).send({ data: deletedItem }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
};
