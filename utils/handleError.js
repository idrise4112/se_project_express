const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("./errors");

function handleError(err, res) {
  console.error("Error name:", err.name);

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid data provided." });
  }

  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid item ID format." });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: "Requested item not found." });
  }

  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
}

module.exports = handleError;
