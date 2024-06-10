const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail');
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

    res.status(StatusCodes.OK).json({ name: user.name, token });
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
    res.status(StatusCodes.OK).json({ name: user.name, token });
}

const verifyToken = async (req,res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.userId);
        if (!user) throw new UnauthenticatedError('Authentication invalid');
        res.status(StatusCodes.OK).json({ name: payload.name, token });
    } 
    catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

const forgotPassword = async (req,res) => {
    const { email } = req.body;
    if (!email) throw new BadRequestError('Please provide your email');

    const user = await User.findOne({ email });
    if (!user) throw new UnauthenticatedError('Invalid Email');
    if (!user.isVerified) throw new UnauthenticatedError('User is not verified');

    const resetPasswordCode = crypto.randomBytes(6).toString('hex');
    const tenMinutes = 1000 * 60 * 10;
    const expirationDate = new Date(Date.now() + tenMinutes);

    user.verificationCode = resetPasswordCode;
    user.resetPasswordCodeExpirationDate = expirationDate;
    await user.save();

    await sendResetPasswordEmail({
        name: user.name,
        email: user.email,
        verificationCode: user.verificationCode
    });

    res.status(StatusCodes.OK).json({ msg: 'Success! Please check your email to reset your password' });
}

const resetPassword = async (req,res) => {
    const { email, verificationCode, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new UnauthenticatedError('Invalid Email');
    if (!user.isVerified) throw new UnauthenticatedError('User is not verified'); 
    if (user.verificationCode !== verificationCode) throw new UnauthenticatedError('Invalid verification code');
    if (user.resetPasswordCodeExpirationDate < Date.now()) throw new BadRequestError('Verification code expired');

    user.password = password;
    user.verificationCode = '';
    user.resetPasswordCodeExpirationDate = null;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'Reset password succesfully' });
}

module.exports = {
    register,
    verifyEmail,
    login,
    verifyToken,
    forgotPassword,
    resetPassword
}