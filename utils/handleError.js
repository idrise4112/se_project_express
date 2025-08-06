const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
} = require("./errors");

function handleError(err, req, res, next) {
  console.error(
    `[${new Date().toISOString()}] [${req.method} ${req.originalUrl}]`
  );
  console.error("Error name:", err?.name);
  console.error("Error message:", err?.message);
  console.error("Full error object:", err);

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

  console.warn(` Unhandled error type: ${err?.name}`);
  return res
    .status(SERVER_ERROR)
    .type("application/json")
    .json({ message: "An error has occurred on the server." });
}

module.exports = handleError;
