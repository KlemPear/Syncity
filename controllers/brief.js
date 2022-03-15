const Brief = require("../models/Brief");

module.exports.onGetAllBriefs = async (req, res, next) => {
	try {
		const brief = await Brief.find();
		return res.status(200).json(brief);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onGetBriefById = async (req, res, next) => {
	try {
		const brief = await Brief.findById(req.params.id);
		return res.status(200).json(brief);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onCreateBrief = async (req, res, next) => {
	try {
		const newBrief = new Brief(req.body);
		newBrief.save();
		return res.status(200).json(brief);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onEditBriefById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const brief = await Brief.findByIdAndUpdate(id, req.body, {
			returnDocument: "after",
		});
		return res.status(200).json(brief);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onDeleteBriefById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteBrief = await Brief.findByIdAndRemove(id);
		return res.status(200).json(deleteBrief);
	} catch (error) {
		return res.status(500).json(error);
	}
};
