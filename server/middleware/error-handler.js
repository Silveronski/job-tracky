const {StatusCodes} = require('http-status-codes');

const errorHandler = (err,req,res,next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong...'
    };

    if (err.name === 'CastError') { // validation for bad req.params.id
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    if (err.name === 'ValidationError') { // validation for missing email and/or password
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) { // validation for duplicate email
        customError.msg = `This ${Object.keys(err.keyValue)} address is already registered to Job Tracky`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    return res.status(customError.statusCode).json({msg: customError.msg});
}   

module.exports = errorHandler;