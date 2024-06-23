const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req,res) => {
    const { search, status, jobType, sort } = req.query;
    const queryObject = { createdBy: req.user.userId };
        
    if (search) queryObject.position = { $regex: search, $options: 'i' };
    if (status && status !== 'all') queryObject.status = status;
    if (jobType && jobType !== 'all') queryObject.jobType = jobType;

    let result = Job.find(queryObject);

    switch (sort) {
        case 'latest':
            result = result.sort('-createdAt');
            break;
        case 'oldest':
            result = result.sort('createdAt');
            break;
        case 'a-z':
            result = result.sort('position');
            break;
        case 'z-a':
            result = result.sort('-position');
            break;
        default:
            result = result.sort('-createdAt');
            break;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const jobs = await result;
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });  
}

const getJob = async (req,res) => {
    const job = await Job.findOne({
        _id: req.params.id, // the id that the user passed
        createdBy: req.user.userId // the userId from the auth middleware
    });
    if (!job) throw new NotFoundError('No job found');    
    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId; // the req.user comes from the authentication middleware
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req,res) => {
    const { company, position } = req.body;
    if (!company || !position)  throw new BadRequestError('Please provide company and postion');
       
    const job = await Job.findOneAndUpdate({
        _id: req.params.id,
        createdBy: req.user.userId
    },
    req.body, {
        new: true, // to return the updated job
        runValidators: true // to enforce model validators
    });
    
    if (!job) throw new NotFoundError('No job found');

    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req,res) => {
    const job = await Job.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user.userId
    });
    if (!job) throw new NotFoundError('No job found');
    res.status(StatusCodes.OK).json({ job });
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}