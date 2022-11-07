const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const licensingJobSchema = new mongoose.Schema(
	{
		track: {
			type: Schema.Types.ObjectId,
			ref: "Track",
		},
		brief: {
			type: Schema.Types.ObjectId,
			ref: "Brief",
		},
		application: {
			type: Schema.Types.ObjectId,
			ref: "Application",
		},
		done: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		collection: "licensingjobs",
	}
);

const LicensingJob = mongoose.model("LicensingJob", licensingJobSchema);
module.exports = LicensingJob;
