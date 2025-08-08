/* eslint-disable no-console */
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
} = require("./errors");

<<<<<<< HEAD
function handleError(err, req, res, next) {
  console.error(err);
=======
// eslint-disable-next-line no-unused-vars
function handleError(err, req, res, next) {
  console.error(
    `[${new Date().toISOString()}] [${req.method} ${req.originalUrl}]`
  );
  console.error("Error name:", err?.name);
  console.error("Error message:", err?.message);
  console.error("Full error object:", err);
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641

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
    UnauthorizedError: {
      status: UNAUTHORIZED,
      message: "Authentication required.",
    },
    ForbiddenError: {
      status: FORBIDDEN,
      message: "You do not have permission to perform this action.",
    },
    JsonWebTokenError: {
      status: UNAUTHORIZED,
      message: "Invalid token.",
    },
    TokenExpiredError: {
      status: UNAUTHORIZED,
      message: "Token has expired.",
    },
  };

<<<<<<< HEAD
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
=======
  const errorResponse = messageMap[err?.name];

  if (errorResponse?.status) {
    return res
      .status(errorResponse.status)
      .type("application/json")
      .json({ message: errorResponse.message });
  }

  if (err?.statusCode && err?.message) {
    return res
      .status(err.statusCode)
      .type("application/json")
      .json({ message: err.message });
  }

  console.warn(`Unhandled error type: ${err?.name}`);
  return res
    .status(SERVER_ERROR)
    .type("application/json")
    .json({ message: "An error has occurred on the server." });
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
}

module.exports = handleError;
