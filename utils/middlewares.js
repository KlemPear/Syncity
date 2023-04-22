const Brief = require("../models/Brief");
const Track = require("../models/Track");
const Application = require("../models/Application");
const User = require("../models/User");

//DB
const mongoDbSetUp = require(".././config/mongo");

//Rate limiter
const { RateLimiterMongo } = require("rate-limiter-flexible");

const LoginFailOpts = {
	storeClient: mongoDbSetUp,
	keyPrefix: "login_limiter_username",
	points: 5, // Number of attempts allowed
	duration: 60, // Per minute
	blockDuration: 60 * 2, // Block for 2 minutes
};

const LoginUserlimiter = new RateLimiterMongo(LoginFailOpts);

module.exports.authLimiter = async (req, res, next) => {
	const username = req.body.username;

	//Check the rate limiter
	LoginUserlimiter.consume(username)
		.then((rateLimiterRes) => {
			if (rateLimiterRes !== null) {
				const date = new Date(Date.now() + rateLimiterRes.msBeforeNext);
				res.setHeader("X-RateLimit-Limit", LoginFailOpts.points),
					res.setHeader(
						"X-RateLimit-Remaining",
						rateLimiterRes.remainingPoints
					),
					res.setHeader(
						"X-RateLimit-Reset",
						date.toLocaleDateString() + " " + date.toLocaleTimeString()
					);
			}
			next();
		})
		.catch((rateLimiterRes) => {
			if (
				rateLimiterRes !== null &&
				rateLimiterRes.consumedPoints > LoginFailOpts.points
			) {
				// Rate limit exceeded, send error response
				const date = new Date(Date.now() + rateLimiterRes.msBeforeNext);
				res.setHeader("Retry-After", rateLimiterRes.msBeforeNext / 1000),
					res.setHeader("X-RateLimit-Limit", LoginFailOpts.points),
					res.setHeader(
						"X-RateLimit-Remaining",
						rateLimiterRes.remainingPoints
					),
					res.setHeader(
						"X-RateLimit-Reset",
						date.toLocaleDateString() + " " + date.toLocaleTimeString()
					),
					res
						.status(429)
						.send("Too many authentication attemps. Please wait 2 minutes.");
				return;
			}
		});
};

const IpRequestOpts = {
	storeClient: mongoDbSetUp,
	keyPrefix: "rate_limiter_ip_request",
	points: 100, // Number of attempts allowed
	duration: 1, // Per sec
};

const IpRequestlimiter = new RateLimiterMongo(IpRequestOpts);

module.exports.rateLimiterMiddleware = (req, res, next) => {
	IpRequestlimiter.consume(req.ip)
		.then((rateLimiterRes) => {
			next();
		})
		.catch((rateLimiterRes) => {
			if (
				rateLimiterRes !== null &&
				rateLimiterRes.consumedPoints > IpRequestOpts.points
			) {
				// Rate limit exceeded, send error response
				const date = new Date(Date.now() + rateLimiterRes.msBeforeNext);
				res.setHeader("Retry-After", rateLimiterRes.msBeforeNext / 1000),
					res.setHeader("X-RateLimit-Limit", IpRequestOpts.points),
					res.setHeader(
						"X-RateLimit-Remaining",
						rateLimiterRes.remainingPoints
					),
					res.setHeader(
						"X-RateLimit-Reset",
						date.toLocaleDateString() + " " + date.toLocaleTimeString()
					),
					res.status(429).send("Too many requests from the same IP");
				return;
			}
		});
};

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
