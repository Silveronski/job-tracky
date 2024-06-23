const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req,res) => {
    // const { search, status, jobType, sort } = req.query;
    // const queryObject = { createdBy: req.user.userId };
        
    // if (search) queryObject.position = { $regex: search, $options: 'i' };
    // if (status && status !== 'all') queryObject.status = status;
    // if (jobType && jobType !== 'all') queryObject.jobType = jobType;

    // let result = Job.find(queryObject);

    // if (sort === 'latest') result = result.sort('-createdAt');
    // if (sort === 'oldest') result = result.sort('createdAt');
    // if (sort === 'a-z') result = result.sort('position');
    // if (sort === 'z-a') result = result.sort('-position');

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // result = result.skip(skip).limit(limit);

    // const jobs = await result;
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt');
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
    if (company.trim() === '' || position.trim() === '') {
        throw new BadRequestError('Please provide company and postion');
    }

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