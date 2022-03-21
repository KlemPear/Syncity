const Application = require("../models/Application");

module.exports.onGetAllApplications = async (req, res, next) => {
	try {
		const applications = await Application.find(req.query);
		return res.status(200).json(applications);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onGetApplicationById = async (req, res, next) => {
	try {
		const application = await Application.findById(req.params.id);
		return res.status(200).json(application);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onCreateApplication = async (req, res, next) => {
	try {
		console.log(req.body);
		const newApplication = new Application(req.body);
		newApplication.save();
		return res.status(200).json(newApplication);
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
		});
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
