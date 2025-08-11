const clothingItem = require("../models/clothingItem");

// POST /items
const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => next(err));
};

// GET /items
const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => next(err));
};

// LIKE /items/:itemId/likes
const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail()
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch(next);
};

// UNLIKE /items/:itemId/likes
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch(next);
};

// DELETE /items/:itemId —
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() === req.user._id) {
        clothingItem
          .findByIdAndDelete(itemId)
          .orFail()
          .then((deletedItem) => res.status(200).send({ data: deletedItem }))
          .catch(next);
      } else {
        res.status(403).send({ message: "unauthorized" });
      }
    })
    .catch(next);
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
};
