const Brief = require("../models/Brief");
const Track = require("../models/Track");
const Application = require("../models/Application");
const User = require("../models/User");

const { BriefValidationSchema, ApplicationValidationSchema, TrackValidationSchema } = require("./validationSchemas");

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		// store URL that is being requested
		return res.status(401).json("You need to be logged in to do this.");
	}
	next();
};

module.exports.isBriefAuthor = async (req, res, next) => {
	const { id } = req.params;
	const brief = await Brief.findById(id);
	if (!brief.author.equals(req.user._id)) {
		return res
			.status(401)
			.json("You need to be the author of this object to do this.");
	} else {
		next();
	}
};

module.exports.isTrackAuthor = async (req, res, next) => {
	const { id } = req.params;
	const track = await Track.findById(id);
	if (!track.author.equals(req.user._id)) {
		return res
			.status(401)
			.json("You need to be the author of this object to do this.");
	} else {
		next();
	}
};

module.exports.isApplicationAuthor = async (req, res, next) => {
	const { id } = req.params;
	const application = await Application.findById(id);
	if (!application.author.equals(req.user._id)) {
		return res
			.status(401)
			.json("You need to be the author of this object to do this.");
	} else {
		next();
	}
};

module.exports.validateBrief = (req, res, next) => {
	const { error } = BriefValidationSchema.validate({ brief: req.body });
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		return res.status(400).send(msg);
	} else {
		next();
	}
};

module.exports.validateApplication = (req, res, next) => {
	const { error } = ApplicationValidationSchema.validate({ application: req.body });
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		return res.status(400).send(msg);
	} else {
		next();
	}
};

module.exports.validateTrack = (req, res, next) => {
	const { error } = TrackValidationSchema.validate({ track: req.body });
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		return res.status(400).send(msg);
	} else {
		next();
	}
};

module.exports.catchAsync = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch((e) => next(e));
	};
};
