const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const register = async (req,res) => { 
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: {name: user.name }, token });
}

const login = async (req,res) => { 
    const {email, password} = req.body;
    if (!email || !password) throw new BadRequestError('Please provide email and password');
        
    const user = await User.findOne({ email });
    if (!user) throw new UnauthenticatedError('Invalid Credentials');

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');
        
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
    login,
    verifyToken
}