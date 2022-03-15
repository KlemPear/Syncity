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
			const user = await User.findById(req.session.passport.user);
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
		const user = await User.findById(req.params.id);
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
		return res.status(500).json(error);
	}
};

module.exports.login = (req, res) => {
	return res.status(200).json(req.user);
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
		return res.status(500).json({ success: false, error: error });
	}
};
