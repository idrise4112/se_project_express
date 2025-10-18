const clothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

// POST /items
const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid item data"));
      } else {
        next(err);
      }
    });
};

// GET /items
const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch(next);
};

// LIKE /items/:itemId/likes
const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// UNLIKE /items/:itemId/likes
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// DELETE /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      if (item.owner.toString() === req.user._id) {
        clothingItem
          .findByIdAndDelete(itemId)
          .orFail(() => new NotFoundError("Item not found"))
          .then((deletedItem) => res.status(200).send({ data: deletedItem }))
          .catch(next);
      } else {
        next(new ForbiddenError("You are not authorized to delete this item"));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
};
