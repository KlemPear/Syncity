const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
	title: String,
	link: String,
	masterContact: String,
	publisherContact: String,
	artistContact: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	brief: {
		type: Schema.Types.ObjectId,
		ref: "Brief",
	},
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
