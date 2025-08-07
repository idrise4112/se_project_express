const clothingItem = require("../models/clothingItem");

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

  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail()
    .then((updatedItem) => res.status(200).json({ data: updatedItem }))
    .catch(next);
};

// UNLIKE /items/:itemId/likes
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((updatedItem) => res.status(200).json({ data: updatedItem }))
    .catch(next);
};

// DELETE /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  // we should check if the currently logged in user actually owns this item, before we delete it
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((deletedItem) => res.status(403).json({ data: deletedItem }))
    .catch(next);
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
};
