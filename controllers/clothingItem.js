const clothingItem = require("../models/clothingItem");

// POST /items
const createItem = (req, res) => {
  console.log("Request body:", req.body);
  const owner = req.user._id;
  const { name, weather, imageURL } = req.body;

  clothingItem
    .create({ name, weather, imageURL, owner })
    .then((item) => {
      console.log("Created item:", item);
      res.status(201).send({ data: item });
    })
    .catch((e) => {
      console.error("Error from createItem:", e);
      res
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
      res
        .status(500)
        .send({ message: "Error from getItems", error: e.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } }, { new: true })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => res.status(500).send({ message: err.message }));

  module.exports = {
    createItem,
    getItems,
    updateItem,
  };
};
