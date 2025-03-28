const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    // if token verification succeeds, 'payload' will get the decoded token object
    // which is the userId and userName that we passed in the jwt.sign method
    // in the createJWT function in the user model.
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    await User.findById(payload.userId); // to check if user exists in the db
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
