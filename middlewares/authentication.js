const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // const user = User.findById(decoded.id).select("-password");
    // req.user = user;
    req.user = { userId: decoded.userId, name: decoded.name };
    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
