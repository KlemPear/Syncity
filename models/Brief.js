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
});

const Brief = mongoose.model("Brief", briefSchema);
module.exports = Brief;
