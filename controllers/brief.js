const Brief = require("../models/Brief");
const User = require("../models/User");

const getNumberOfDays = (start, end) => {
	const date1 = new Date(start);
	const date2 = new Date(end);

	// One day in milliseconds
	const oneDay = 1000 * 60 * 60 * 24;

	// Calculating the time difference between two dates
	const diffInTime = date2.getTime() - date1.getTime();

	// Calculating the no. of days between two dates
	const diffInDays = Math.round(diffInTime / oneDay);

	return diffInDays;
};

const updateClosedBrief = async (briefs) => {
	briefs.forEach(async (brief) => {
		if (getNumberOfDays(new Date(Date.now()), brief.dueDate) < 0) {
			brief.open = false;
			const updatedBrief = await Brief.findByIdAndUpdate(brief._id, brief, {
				returnDocument: "after",
			});
			brief = updatedBrief;
		}
	});
	return briefs;
};

module.exports.onGetAllBriefs = async (req, res, next) => {
	try {
		if (req.query) {
			const briefs = await Brief.find(req.query);
			const updatedBriefs = await updateClosedBrief(briefs);
			return res.status(200).json(updatedBriefs);
		} else {
			const briefs = await Brief.find();
			const updatedBriefs = await updateClosedBrief(briefs);
			return res.status(200).json(updatedBriefs);
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
		const privateBriefs = await Brief.find({
			private: true,
			open: true,
			author: { $in: connections },
		});
		const ownPrivateBriefs = await Brief.find({
			private: true,
			open: true,
			author: req.params.id,
		});
		const briefs = privateBriefs.concat(ownPrivateBriefs);
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
			console.log("not enough tokens to do this.");
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
