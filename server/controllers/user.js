const User = require("../models/User");
const Job = require("../models/Job");
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const deleteAccount = async (req,res) => {
    const userId = req.user.userId; // from auth middleware
    if (!userId) throw new BadRequestError('Invalid Credentials');

    const user = await User.findById(userId);
    if (!user) throw new UnauthenticatedError('User not found');

    await Promise.all([      
        Job.deleteMany({ createdBy: userId }),
        user.deleteOne()  
    ]);
    
    res.status(StatusCodes.OK).json({ msg: 'user account deleted successfully' });
};

const changePassword = async (req,res) => {
    res.send("changePassword");
};

module.exports = {
    deleteAccount,
    changePassword
};