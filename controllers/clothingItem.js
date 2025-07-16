const clothingItem = require("../models/clothItem");

const createItem = (req, res) => {
  console.log("Request body:", req.body);

  const { name, weather, imageURL } = req.body;

  clothingItem
    .create({ name, weather, imageURL })
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

module.exports = {
  createItem,
};
