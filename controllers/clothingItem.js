const mongoose = require("mongoose");
const clothingItem = require("../models/clothingItem");
<<<<<<< HEAD
=======
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641

// POST /items
const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner })
<<<<<<< HEAD
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => next(err));
=======
    .then((item) => res.status(201).json({ data: item }))
    .catch(next);
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
};

// GET /items
const getItems = (req, res, next) => {
  clothingItem
    .find({})
<<<<<<< HEAD
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => next(err));
=======
    .then((items) => res.status(200).json({ data: items }))
    .catch(next);
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
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
<<<<<<< HEAD
    .orFail()
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch((err) => next(err));
=======
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => res.status(200).json({ data: updatedItem }))
    .catch(next);
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
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
<<<<<<< HEAD
    .orFail()
    .then((updatedItem) => res.send({ data: updatedItem }))
    .catch((err) => next(err));
};

// DELETE /items/:itemId —
=======
    .orFail(() => new NotFoundError("Item not found"))
    .then((updatedItem) => res.status(200).json({ data: updatedItem }))
    .catch(next);
};

// DELETE /items/:itemId
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  console.log("Deleeting item with id:", itemId);

  clothingItem
<<<<<<< HEAD
    .findByIdAndDelete(itemId)
    .orFail(() => new NotFoundError(`Item with id ${itemId} not found`))
    .then((deletedItem) => {
      res.status(200).send({ data: deletedItem });
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
      next(err);
    });
  // };
  //   clothingItem.findById;

  //   clothingItem
  //     .findByIdAndDelete(itemId)
  //     .orFail()
  //     .then((deletedItem) => res.status(200).send({ data: deletedItem }))
  //     .catch((err) => {
  //       console.log(err);
  //       next(err);
  //     });
=======
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
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
};
