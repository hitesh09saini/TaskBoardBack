
const List = require('../models/list.model')
const User = require('../models/user.model')
const ApiError = require('../utils/ApiError')
const AsyncHandler = require('../utils/asynchandler')

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    // secure: false, // Since you are using http://localhost, not https
    // domain: 'localhost', // Set to your domain
    // path: '/api/v1/user', // Set to the path relevant to your application
    // sameSite: 'None',
    sameSite: 'strict' 
};


const register = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        throw ApiError('All Fields is Required!', 400)
    }

    const user = await User.findOne({ email });

    if (user) {
        throw new ApiError('User Already Exist!', 400);
    }

    const emptyList = await List.create({ lists: [] });

    const newUser = await User.create({
        email,
        password,
        list: emptyList._id,
    });


    await newUser.save();

    const token = await newUser.generateToken();
    res.cookie('token', token, cookieOptions)

    res.status(200).json({
        success: true,
        massage: 'User Successfully Created !',
        newUser
    })

})

const login = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ApiError('All Fields are Required!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ApiError('User does not exist with this email', 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return next(new ApiError('Password does not match! Please re-enter', 400));
    }

    const token = await user.generateToken();

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
    });
});

const logout = AsyncHandler(async (req, res, next) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
})



module.exports = {
    register,
    login,
    logout
}