const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserScheme = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        minlength: 3,
        maxlength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true, 
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    verificationCode: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
});

// this function gets called before saving the user model
// we use a regular function instead of arrow function to get the correct 'this' refarence
UserScheme.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10); // generate 10 random bytes
    this.password = await bcrypt.hash(this.password, salt);
});

UserScheme.methods.createJWT = function() {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
}

UserScheme.methods.comparePassword = async function(canditatePassword) {
    return await bcrypt.compare(canditatePassword, this.password);
}

module.exports = mongoose.model('User', UserScheme);