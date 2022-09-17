const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
	type: "string",
	base: joi.string(),
	messages: {
		"string.escapeHTML": "{{#label}} must not include HTML!",
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				if (clean != value)
					return helpers.error("string.escapeHTML", { value });
				return clean;
			},
		},
	},
});

const Joi = BaseJoi.extend(extension);

module.exports.BriefValidationSchema = Joi.object({
	brief: Joi.object({
		//required
		title: Joi.string().required().escapeHTML(),
		dueDate: Joi.date().required(),
		budget: Joi.number().required().min(0),
		media: Joi.string().required().escapeHTML(),
		licenseDuration: Joi.string().required().escapeHTML(),
		author: Joi.string().guid().required(),
		// not required
		description: Joi.string().escapeHTML().escapeHTML(),
		numberOfApplicationsWanted: Joi.number(),
		use: Joi.array().items(Joi.string()),
		extractDuration: Joi.string().escapeHTML(),
		territory: Joi.array().items(Joi.string()),
		genres: Joi.array().items(Joi.string()),
		vocals: Joi.array().items(Joi.string()),
		moods: Joi.array().items(Joi.string()),
		instruments: Joi.array().items(Joi.string()),
		tempo: Joi.string(),
		references: Joi.array()
			.items(
				Joi.object({
					link: Joi.string().required(),
					title: Joi.number().required(),
					comment: Joi.string(),
				})
			)
			.max(3),
	}).required(),
});

const TrackValidationSchema = Joi.object({
	track: Joi.object({
		title: Joi.string().required().escapeHTML(),
		artist: Joi.string().required().escapeHTML(),
		link: Joi.string().required().escapeHTML(),
		masterContact: Joi.string().email().required().escapeHTML(),
		publisherContact: Joi.string().email().required().escapeHTML(),
		author: Joi.string().guid().required().escapeHTML(),
	}).required(),
});
module.exports.TrackValidationSchema;

module.exports.ApplicationValidationSchema = Joi.object({
	application: Joi.object({
		tracks: Joi.array().items(TrackValidationSchema).required().min(1).max(3),
		author: Joi.string().guid().required().escapeHTML(),
		brief: Joi.string().guid().required().escapeHTML(),
	}).required(),
});

module.exports.UserValidationSchema = Joi.object({
	user: Joi.object({
		firstName: Joi.string().required().escapeHTML(),
		lastName: Joi.string().required().escapeHTML(),
		email: Joi.string().email().required().escapeHTML(),
	}).required(),
});
