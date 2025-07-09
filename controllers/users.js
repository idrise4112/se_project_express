const User = require("../models/user");

// GET /users
const getUsers = (req, res) => {
  console.log("getusers has run");
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getUsers };
