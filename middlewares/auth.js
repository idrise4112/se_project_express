const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer ")) {
    return next(new AuthError("Authorization required."));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return next(new AuthError("Invalid token."));
  }
};
