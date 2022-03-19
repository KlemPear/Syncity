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
		if (req.body.logo == null) {
			req.body.logo =
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpd8grPAcmeeZPO_pho-bOhFivjEq8MCTFPw&usqp=CAU";
		}
		const newBrief = new Brief(req.body);
		newBrief.save();
		return res.status(200).json(newBrief);
	} catch (error) {
    console.log(error);
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
		console.log(error);
		return res.status(500).json(error);
	}
};
