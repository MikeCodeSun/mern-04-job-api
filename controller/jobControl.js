const Job = require("../model/jobModel");

const getAllJobs = async (req, res) => {
  const allJobs = await Job.find({ createdBy: req.user.id });
  if (allJobs.length === 0) {
    res.status(500).json({ msg: "no jobs" });
  }
  res.status(200).json({ msg: "get all jobs", allJobs });
};

const createJob = async (req, res) => {
  const {
    user,
    body: { company, position },
  } = req;
  if (!company || !position) {
    res.status(500).json({ msg: "need company and position" });
  }
  const newJob = await Job.create({ company, position, createdBy: user.id });

  res.status(200).json({ msg: "create job", newJob });
};

const deleteJob = async (req, res) => {
  const user_id = req.user.id;
  const job_id = req.params.id;
  // console.log(user_id, job_id);

  const deleteOne = await Job.findOneAndRemove({
    _id: job_id,
    createdBy: user_id,
  });

  if (!deleteOne) {
    res.status(500).json({ msg: `no job id: ${job_id} existed` });
  }
  res.status(200).json({ msg: "delete job" });
};

const updateJob = async (req, res) => {
  const user_id = req.user.id;
  const job_id = req.params.id;
  // console.log(user_id, job_id);

  const updateOne = await Job.findOneAndUpdate(
    {
      _id: job_id,
      createdBy: user_id,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updateOne) {
    res.status(500).json({ msg: `no job id: ${job_id} existed` });
  }

  res.status(200).json({ msg: "update job", updateOne });
};

const getJob = async (req, res) => {
  const user_id = req.user.id;
  const job_id = req.params.id;
  // console.log(user_id, job_id);

  const theOne = await Job.findOne({
    _id: job_id,
    createdBy: user_id,
  });

  if (!theOne) {
    res.status(500).json({ msg: `no job id: ${job_id} existed` });
  }

  res.status(200).json({ msg: "get job", theOne });
};

module.exports = { getAllJobs, createJob, deleteJob, updateJob, getJob };
