// const { SOME_ERROR_CODE } = require("../utils/errors");

// const createUser = (req, res) => {
//   User.create(...)    // arguments omitted
//     .then(...)        // handle successful request
//     .catch((err) => {
//       console.error(err);
//       if (err.name === 'SomeErrorName') {
//         return res.status(SOME_ERROR_CODE).send({ message: "Appropriate error message" })
//       } else {
//         // if no errors match, return a response with status code 500
//       }
//     });
// }

// utils/errors.js
module.exports = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
