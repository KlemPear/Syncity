const Brief = require("../models/Brief");
const Track = require("../models/Track");
const Application = require("../models/Application");
const User = require("../models/User");

const {
	BriefValidationSchema,
	ApplicationValidationSchema,
	TrackValidationSchema,
	UserValidationSchema,
} = require("./validationSchemas");

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		// store URL that is being requested
		return res.status(401).json("You need to be logged in to do this.");
	}
	next();
};

module.exports.hasVerificationHeader = (req, res, next) => {
	if (
		req.headers.originverification !== "800d0df5-7b35-45c2-b862-0493bd703c24"
	) {
		return res.status(401).json("Request origin not verified.");
	}
	next();
};

module.exports.isVerifiedBriefer = async (req, res, next) => {
	const { author } = req.body;
	const user = await User.findById(author);
	if (user.briefSubscriptionPlan !== "Verified") {
		res
			.status(401)
			.json("You need to be a verified briefer to create a brief.");
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
	const { error } = ApplicationValidationSchema.validate({
		application: req.body,
	});
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

module.exports.validateUser = (req, res, next) => {
	const { error } = UserValidationSchema.validate({ user: req.body });
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
