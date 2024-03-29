const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new mongoose.Schema(
	{
		tracks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Track",
			},
		],
		tracksComments: [
			{
				trackId: { type: String },
				comment: { type: String },
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
		liked: { type: Boolean, default: false },
		likedTracks: [{ type: String }],
		licensingJobStatus: {
			type: String,
			enum: ["None", "Pending", "Obtained"],
			default: "None",
		},
	},
	{
		timestamps: true,
		collection: "applications",
	}
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
