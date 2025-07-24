const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("./errors");

function handleError(err, res) {
  console.error("Error name:", err.name);
  // console.error("Stack trace:", err.stack);

  const messageMap = {
    ValidationError: {
      status: BAD_REQUEST,
      message: "Invalid data provided.",
    },
    CastError: {
      status: BAD_REQUEST,
      message: "Invalid item ID format.",
    },
    DocumentNotFoundError: {
      status: NOT_FOUND,
      message: "Requested item not found.",
    },
  };

  const errorResponse = messageMap[err.name];

  if (errorResponse) {
    return res
      .status(errorResponse.status)
      .send({ message: errorResponse.message });
  }

  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
}

module.exports = handleError;
