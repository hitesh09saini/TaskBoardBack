
const List = require('../models/list.model')
const User = require('../models/user.model')
const ApiError = require('../utils/ApiError')
const AsyncHandler = require('../utils/asynchandler')

const register = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // Use return to avoid continuing execution after error
    return next(new ApiError('All fields are required!', 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    // User exists, verify password for login
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ApiError('Password does not match! Please re-enter', 400));
    }
  } else {
    // User does not exist, create new user and list
    const newList = new List();
    await newList.save();

    user = new User({
      email,
      password,
      list: newList._id,
    });
    await user.save();
  }

  const token = await user.generateToken();

  res.status(200).json({
    success: true,
    token,
    message: 'User successfully logged in!',
  });
});

module.exports = {
    register
}