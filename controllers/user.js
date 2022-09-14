// models
const User = require("../models/User");
const SendEmail = require("../emails/mail");
const {
	welcomeEmailOptions,
	inviteEmailOptions,
	forgotPasswordEmailOptions,
} = require("../emails/emailTemplates");
const { GenerateVerificationToken } = require("../utils/verificationToken");

module.exports.onGetAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.getSession = async (req, res, next) => {
	try {
		if (req.session.passport) {
			const user = await User.findById(req.session.passport.user).populate(
				"connections"
			);
			return res.status(200).json(user);
		} else {
			return res.status(200).json(false);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onGetUserById = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id).populate("connections");
		if (!user) {
			throw { error: "No user with this id found" };
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onGetUserByConfirmationCode = async (req, res, next) => {
	try {
		const { confirmationCode } = req.params;
		const user = await User.findOne({ confirmationCode: confirmationCode });
		if (!user) {
			throw { error: "No user with this confirmation code found" };
		}
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onCreateUser = async (req, res, next) => {
	try {
		if (await User.findOne({ email: req.body.user.email })) {
			return res.status(202).json({ username: req.body.user.email });
		}
		// Do validation here with Joi
		const { password } = req.body;
		const user = new User(req.body.user);
		user.confirmationCode = GenerateVerificationToken();
		const registeredUser = await User.register(user, password);
		await req.login(registeredUser, (err) => {
			if (err) return res.status(500).json(error);
			return res.status(200).json(registeredUser);
		});
		req.session.user = registeredUser;
		SendEmail(
			welcomeEmailOptions(
				registeredUser.firstName,
				registeredUser.confirmationCode,
				registeredUser.email
			)
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.login = async (req, res) => {
	const user = await User.findById(req.user._id).populate("connections");
	if (user.status != "Active") {
		return res.status(401).send({
			message: "Pending Account. Please Verify Your Email!",
		});
	}
	return res.status(200).json(user);
};

module.exports.logout = (req, res) => {
	req.logout();
	req.session.destroy();
	res.clearCookie("SessionId");
	return res.status(200).json(null);
};

module.exports.onDeleteUserById = async (req, res, next) => {
	try {
		const user = await User.deleteOne({ _id: req.params.id });
		if (user.deletedCount === 0) {
			return res.status(404).json({
				success: false,
				message: "User not found. Nothing was deleted.",
			});
		}
		return res.status(200).json({
			success: true,
			message: `Deleted a count of ${user.deletedCount} user.`,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onAddTokens = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const updatedUser = await User.updateTokensOfUser(userId, req.body.tokens);
		return res.status(200).json(updatedUser);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onBurnBriefToken = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const updatedUser = await User.burnOneBriefTokenOfUser(userId);
		if (!updatedUser) {
			return res.status(500).json(error);
		}
		return res.status(200).json(updatedUser);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onBurnPitchToken = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const updatedUser = await User.burnOnePitchTokenOfUser(userId);
		if (!updatedUser) {
			return res.status(500).json(error);
		}
		return res.status(200).json(updatedUser);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onUpdateUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		if (new Set(req.body.connections).size !== req.body.connections.length) {
			return res.status(400).json("duplicated connection");
		}
		const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
			returnDocument: "after",
		}).populate("connections");
		return res.status(200).json(updatedUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onSearch = async (req, res, next) => {
	try {
		const user = await User.findOne(req.body).populate("connections");
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onInviteNewUser = async (req, res, next) => {
	try {
		const { inviteFrom, inviteTo } = req.body;
		SendEmail(inviteEmailOptions(inviteFrom, inviteTo));
		res.status(200).json(inviteTo);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onForgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(204).json("user not found");
		}
		SendEmail(
			forgotPasswordEmailOptions(
				user.firstName,
				user.confirmationCode,
				user.email
			)
		);
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onResetPassword = async (req, res, next) => {
	try {
		const { password, passwordValidation } = req.body;
		const { confirmationCode } = req.params;
		if (password !== passwordValidation) {
			return res.status(500).json("passwords don't match.");
		}
		const user = await User.findOne({ confirmationCode: confirmationCode });
		if (!user) {
			throw { error: "No user with this confirmation code found" };
		}
		user.setPassword(req.body.password, async function (err, user) {
			if (!err) {
				const updatedUser = await User.findByIdAndUpdate(user._id, user, {
					returnDocument: "after",
				});
				res.status(200).json(updatedUser);
			}
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.verifyUser = async (req, res) => {
	try {
		const user = await User.findOne({
			confirmationCode: req.params.confirmationCode,
		});
		if (!user) {
			return res.status(404).json({ message: "User Not found." });
		}
		user.status = "Active";
		const updatedUser = await User.findByIdAndUpdate(user._id, user, {
			returnDocument: "after",
		}).populate("connections");
		req.login(updatedUser, function (err) {
			if (err) {
				return console.log(err);
			}
			return res.status(200).json(updatedUser);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
