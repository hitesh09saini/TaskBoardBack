require('dotenv').config();
const ApiError = require('../utils/ApiError');
const AsyncHandler = require('../utils/asynchandler');
const jwt = require('jsonwebtoken');

const isLoggedIn = AsyncHandler(async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];

  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }
  try {
    // Decoding the token using jwt package verify method
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return next(new ApiError('Unauthorized, please login to continue', 401));
    }
    // If all good, store the id in req object
    req.user = decoded;
    // Do not forget to call the next, otherwise, the flow of execution will not be passed further
    next();
  } catch (error) {
    // If an error occurs during token verification
    return next(new ApiError('Unauthorized, please login to continue', 401));
  }
});

module.exports = isLoggedIn;
