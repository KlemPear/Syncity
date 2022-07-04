const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema({
	title: String,
  artist: String,
	link: String,
	masterContact: String,
	publisherContact: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	}
});

const Track = mongoose.model("Track", trackSchema);
module.exports = Track;
