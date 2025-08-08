const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("./errors");

function handleError(err, req, res, next) {
  console.error(err);

  // Mongoose error mapping
  const mongooseErrorMap = {
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

  if (mongooseErrorMap[err.name]) {
    const { status, message } = mongooseErrorMap[err.name];
    return res.status(status).json({ message });
  }

  if (typeof err.statusCode === "number") {
    const message = err.message || "An error occurred.";
    return res.status(err.statusCode).json({ message });
  }

  const fallbackStatus = SERVER_ERROR;
  const fallbackMessage =
    err?.message || "An error has occurred on the server.";
  return res.status(fallbackStatus).json({ message: fallbackMessage });
}

module.exports = handleError;
