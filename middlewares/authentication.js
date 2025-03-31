const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const auth = async (err, req, res, next) => {
  console.log("Middleware Running..."); // 🔍 Debugging log
  // check header
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("Token missing!");
    throw new UnauthenticatedError("Token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);
    req.user = { userId: decoded.userId, name: decoded.name };
    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
