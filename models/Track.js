const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema(
	{
		title: String,
		artist: String,
		link: {
			type: String,
			//default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
		masterContact: String,
		publisherContact: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		audioFile: {
			key: String,
			path: String,
		},
	},
	{
		timestamps: true,
		collection: "tracks",
	}
);

const Track = mongoose.model("Track", trackSchema);
module.exports = Track;
