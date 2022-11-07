const Application = require("../models/Application");
const Brief = require("../models/Brief");
const User = require("../models/User");

module.exports.onGetAllApplications = async (req, res, next) => {
	try {
		const applications = await Application.find(req.query)
			.populate("author")
			.populate("brief")
			.populate("tracks");
		return res.status(200).json(applications);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onGetApplicationById = async (req, res, next) => {
	try {
		const application = await Application.findById(req.params.id)
			.populate("author")
			.populate("brief")
			.populate("tracks");
		return res.status(200).json(application);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onGetAllUsersLikedApplications = async (req, res, next) => {
	try {
		const { author } = req.query;
		const applications = await Application.find({
			author: author,
			"likedTracks.0": { $exists: true },
		})
			.populate("author")
			.populate("brief")
			.populate("tracks");
		return res.status(200).json(applications);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onGetAllUsersSuccessfulApplications = async (req, res, next) => {
	try {
		const { author } = req.query;
		const applications = await Application.find({
			$or: [
				{ author: author, licensingJobStatus: "Pending" },
				{ author: author, licensingJobStatus: "Obtained" },
			],
		})
			.populate("author")
			.populate("brief")
			.populate("tracks");
		return res.status(200).json(applications);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onCreateApplication = async (req, res, next) => {
	try {
		const brief = await Brief.findById(req.body.brief);
		if (!brief.open) {
			return res.status(500).json("too many applications");
		} else {
			brief.numberOfApplicationsSubmitted += 1;
			if (
				brief.numberOfApplicationsSubmitted === brief.numberOfApplicationsWanted
			) {
				brief.open = false;
			}
			const updatedBrief = await Brief.findByIdAndUpdate(brief._id, brief, {
				returnDocument: "after",
			});
			const newApplication = new Application(req.body);
			newApplication.save();
			return res.status(200).json(newApplication);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onEditApplicationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const application = await Application.findByIdAndUpdate(id, req.body, {
			returnDocument: "after",
		})
			.populate("author")
			.populate("brief")
			.populate("tracks");
		return res.status(200).json(application);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onLikeApplicationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const application = await Application.findByIdAndUpdate(id, req.body, {
			returnDocument: "after",
		})
			.populate("author")
			.populate("brief")
			.populate("tracks");
		return res.status(200).json(application);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onDeleteApplicationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteApplication = await Application.findByIdAndRemove(id);
		return res.status(200).json(deleteApplication);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
