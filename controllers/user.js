// models
const User = require("../models/User");

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

module.exports.onCreateUser = async (req, res, next) => {
	try {
		// Do validation here with Joi
		const { password } = req.body;
		const user = new User(req.body.user);
		const registeredUser = await User.register(user, password);
		await req.login(registeredUser, (err) => {
			if (err) return res.status(500).json(error);
			return res.status(200).json(registeredUser);
		});
		req.session.user = registeredUser;
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.login = async (req, res) => {
	const user = await User.findById(req.user._id).populate("connections");
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
		const user = await User.findOne(req.body);
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
