const Track = require("../models/Track");
const Brief = require("../models/Brief");
const User = require("../models/User");
const LicensingJob = require("../models/LicensingJob");

module.exports.onGetAllLicensingJob = async (req, res, next) => {
	try {
		const licensingJobs = await LicensingJob.find(req.query)
			.populate({
				path: "brief",
				populate: { path: "author" },
			})
			.populate({
				path: "track",
				populate: { path: "author" },
			});
		return res.status(200).json(licensingJobs);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onGetLicensingJobById = async (req, res, next) => {
	try {
		const licensingJob = await LicensingJob.findById(req.params.id)
			.populate({
				path: "brief",
				populate: { path: "author" },
			})
			.populate({
				path: "track",
				populate: { path: "author" },
			});
		return res.status(200).json(licensingJob);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onCreateLicensingJob = async (req, res, next) => {
	try {
		const newlicensingJob = new LicensingJob(req.body);
		await newlicensingJob.save();
		return res.status(200).json(newlicensingJob);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onEditLicensingJobById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const licensingJob = await LicensingJob.findByIdAndUpdate(id, req.body, {
			returnDocument: "after",
		})
			.populate({
				path: "brief",
				populate: { path: "author" },
			})
			.populate({
				path: "track",
				populate: { path: "author" },
			});
		return res.status(200).json(licensingJob);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onDeleteLicensingJobById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteLicensingJob = await LicensingJob.findByIdAndRemove(id);
		return res.status(200).json(deleteLicensingJob);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
