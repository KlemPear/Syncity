const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const briefSchema = new mongoose.Schema({
	title: String,
	description: String,
	dueDate: Date,
	budget: Number,
	logo: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	numberOfApplicationsWanted: { type: Number, default: -1 },
	numberOfApplicationsSubmitted: { type: Number, default: 0 },
	media: String,
	use: String,
	licenseDuration: String,
	extractDuration: String,
	territory: String,
	genres: String,
	vocals: String,
	moods: String,
	instruments: String,
	tempo: String,
	exclusivity: String,
	open: { type: Boolean, default: true },
	private: { type: Boolean, default: false },
	references: [
		{
			link: String,
			comment: String,
		},
	],
});

const Brief = mongoose.model("Brief", briefSchema);
module.exports = Brief;
