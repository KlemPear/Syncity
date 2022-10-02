const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
	title: String,
  description: String,
	link: String,
  date: Date,
  read: {type: Boolean, default: false},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	}
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
