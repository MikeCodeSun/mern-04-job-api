const {
  getAllJobs,
  createJob,
  getJob,
  deleteJob,
  updateJob,
} = require("../controller/jobControl");

const router = require("express").Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
