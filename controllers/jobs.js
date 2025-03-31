const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("get a job");
};

const createJob = async (req, res) => {
  console.log("Received token, req.user:", req.user);
  if (!req.user) {
    return res.status(401).json({ error: "Authentication failed" });
  }
  res.json(req.user);
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
