const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { company, position } = req.body;
  const { userId } = req.user;
  const { id: jobId } = req.params;

  if (!company || !position)
    throw new BadRequestError("Please provide company AND position");

  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) throw new NotFoundError(`Job with id ${jobId} doesn't exist`);

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;

  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) throw new NotFoundError(`Job with ${jobId} id is not found.`);
  res.status(StatusCodes.OK).send(`Deleted job with id ${jobId}`);
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
