const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
	tracks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Track",
		},
	],
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
