const mongoose = require("mongoose");
const clothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

// POST /items
const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).json({ data: item }))
    .catch(next);
};

// GET /items
const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).json({ data: items }))
    .catch(next);
};

// LIKE /items/:itemId/likes
const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => res.status(200).json({ data: updatedItem }))
    .catch(next);
};

// UNLIKE /items/:itemId/likes
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => res.status(200).json({ data: updatedItem }))
    .catch(next);
};

// DELETE /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  clothingItem
    .findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      if (!item.owner.equals(userId)) {
        throw new ForbiddenError(
          "You do not have permission to delete this item"
        );
      }
      return item.deleteOne();
    })
    .then(() => res.status(200).json({ message: "Item deleted successfully" }))
    .catch(next);
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
};
