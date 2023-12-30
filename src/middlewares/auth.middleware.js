require('dotenv').config();
const ApiError = require('../utils/ApiError')
const AsyncHandler = require('../utils/asynchandler')
const jwt = require('jsonwebtoken');

const isLoggedIn = AsyncHandler(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new ApiError("Unauthorized, please login to continue", 401));
    }

    // Decoding the token using jwt package verify method
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // If no decode send the message unauthorized
    if (!decoded) {
        return next(new ApiError("Unauthorized, please login to continue", 401));
    }

    // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
    req.user = decoded;

    // Do not forget to call the next other wise the flow of execution will not be passed further
    next();
})


module.exports = isLoggedIn;