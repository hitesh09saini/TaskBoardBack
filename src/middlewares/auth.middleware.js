require('dotenv').config();
const ApiError = require('../utils/ApiError');
const AsyncHandler = require('../utils/asynchandler');
const jwt = require('jsonwebtoken');

const isLoggedIn = AsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ApiError('Unauthorized, please login to continue', 401));
  }

  try {
    // Decoding the token using jwt package verify method
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
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
