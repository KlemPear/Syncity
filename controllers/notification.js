const Notification = require("../models/Notification");
const User = require("../models/User");

module.exports.onGetAllNotifications = async (req, res, next) => {
	try {
		const notifications = await Notification.find(req.query);
		return res.status(200).json(notifications.sort((a,b)=>-(a.date-b.date)));
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onGetNotificationById = async (req, res, next) => {
	try {
		const notification = await Notification.findById(req.params.id);
		return res.status(200).json(notification);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onCreateNotification = async (req, res, next) => {
	try {
		const newNotification = new Notification(req.body);
		await newNotification.save();
		return res.status(200).json(newNotification);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onEditNotificationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const notification = await Notification.findByIdAndUpdate(id, req.body, {
			returnDocument: "after",
		});
		return res.status(200).json(notification);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.onDeleteNotificationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteNotification = await Notification.findByIdAndRemove(id);
		return res.status(200).json(deleteNotification);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
