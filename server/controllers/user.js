const User = require("../models/User");
const Job = require("../models/Job");
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const deleteAccount = async (req,res) => {
    const userId = req.user.userId; // from auth middleware
    const user = await User.findById(userId);
    if (!user) throw new UnauthenticatedError('User not found');

    await Promise.all([      
        Job.deleteMany({ createdBy: userId }),
        user.deleteOne()  
    ]);
    
    res.status(StatusCodes.OK).json({ msg: 'user account deleted successfully' });
};

const changePassword = async (req,res) => {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) throw new BadRequestError('Please provide current and new password');

    const userId = req.user.userId; // from auth middleware
    const user = await User.findById(userId);
    if (!user) throw new UnauthenticatedError('User not found');

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'user password changed successfully' });
};

module.exports = {
    deleteAccount,
    changePassword
};