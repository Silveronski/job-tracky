const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const crypto = require('crypto');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const register = async (req,res) => { 
    const { email, name, password } = req.body;
    const verificationCode = crypto.randomBytes(3).toString('hex');
    const user = await User.create({ 
        name,
        email,
        password,
        verificationCode
    });

    await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationCode: user.verificationCode
    });

    res.status(StatusCodes.CREATED).json({ msg: 'Success! Please check your email to verify account' });
}

const verifyEmail = async (req,res) => {
    const { verificationCode, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new UnauthenticatedError('Verification Failed');
    if (user.verificationCode !== verificationCode) throw new UnauthenticatedError('Verification Failed');
    if (user.isVerified) throw new BadRequestError('User is already verified');

    user.isVerified = true;
    user.verificationCode = '';
    await user.save();

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

const login = async (req,res) => { 
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError('Please provide email and password');
        
    const user = await User.findOne({ email });
    if (!user) throw new UnauthenticatedError('Invalid Credentials');

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');

    if (!user.isVerified) throw new UnauthenticatedError('Please verify your email');
        
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

const verifyToken = async (req,res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        res.status(StatusCodes.OK).json({ user: { name: payload.name, token }})
    } 
    catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = {
    register,
    verifyEmail,
    login,
    verifyToken
}