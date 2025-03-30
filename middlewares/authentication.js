const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const auth = async (err, req, res, next) => {
  // check header
  const authHeader = req.body.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId, name: decoded.name };
    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
