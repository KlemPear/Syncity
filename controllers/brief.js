const Brief = require("../models/Brief");
const User = require("../models/User");

module.exports.onGetAllBriefs = async (req, res, next) => {
	try {
		if (req.query) {
			const briefs = await Brief.find(req.query);
			return res.status(200).json(briefs);
		} else {
			const briefs = await Brief.find();
			return res.status(200).json(briefs);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onGetPrivateBriefs = async (req, res, next) => {
	try {
		const { connections } = await User.findById(req.params.id);
		if (!connections) {
			return res.status(200).json({});
		}
		const briefs = await Brief.find({
			private: true,
			author: { $in: connections },
		});
		return res.status(200).json(briefs);
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
		const updatedUser = await User.updateTokensOfUser(req.body.author, -10);
		if (!updatedUser) {
			return res.status(500).json("Not enough tokens to do this.");
		} else {
			const newBrief = new Brief(req.body);
			newBrief.save();
			return res.status(200).json(newBrief);
		}
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
		}).populate("author");
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
