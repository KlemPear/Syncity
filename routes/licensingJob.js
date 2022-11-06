const express = require("express");
// controllers
const licensingJob = require("../controllers/licensingJob");

const router = express.Router();

router
	.get("/", licensingJob.onGetAllLicensingJob)
	.get("/:id", licensingJob.onGetLicensingJobById)
	.post("/", licensingJob.onCreateLicensingJob)
	.put("/:id", licensingJob.onEditLicensingJobById)
	.delete("/:id", licensingJob.onDeleteLicensingJobById);

module.exports = router;
