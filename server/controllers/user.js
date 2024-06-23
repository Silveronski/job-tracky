const User = require("../models/User");
const Job = require("../models/Job");
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getUserDetails = async (req,res) => {
    const user = await getUserFromDb(req.user.userId);
    res.status(StatusCodes.OK).json({ user: { name: user.name, email: user.email, avatar: user.avatar }});
};

const deleteAccount = async (req,res) => {
    const { password } = req.body;
    if (!password) throw new BadRequestError('Please provide a password');

    const user = await User.findById(req.user.userId);
    isUserValid(user);

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');

    await Promise.all([      
        Job.deleteMany({ createdBy: userId }),
        user.deleteOne()  
    ]);  

    res.status(StatusCodes.OK).json({ msg: 'user account deleted successfully' });
};

const changePassword = async (req,res) => {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) throw new BadRequestError('Please provide current and new password');

    const user = await getUserFromDb(req.user.userId);
    
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'user password changed successfully' });
};

const getUserFromDb = async (userId) => {
    const user = await User.findById(userId);
    isUserValid(user);
    return user;
};

const isUserValid = (user) => {
    if (!user) throw new BadRequestError('User not found');
    if (!user.isVerified) throw new UnauthenticatedError('User is not verified');
};

module.exports = {
    getUserDetails,
    deleteAccount,
    changePassword
};