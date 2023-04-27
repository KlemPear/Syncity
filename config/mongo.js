const mongoose = require("mongoose");
require("dotenv").config();

const db = {
	url: "localhost:27017",
	name: "syncity",
};

const CONNECTION_URL =
	process.env.NODE_ENV === "production"
		? process.env.MONGODB_CONNECTION_STRING
		: process.env.MONGODB_CONNECTION_STRING_TEST;
// : `mongodb://${db.url}/${db.name}`;
mongoose.set('strictQuery', true);
mongoose.connect(CONNECTION_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
	console.log("Mongo has connected succesfully");
});
mongoose.connection.on("reconnected", () => {
	console.log("Mongo has reconnected");
});
mongoose.connection.on("error", (error) => {
	console.log("Mongo connection has an error", error);
	mongoose.disconnect();
});
mongoose.connection.on("disconnected", () => {
	console.log("Mongo connection is disconnected");
});

const mongoDbSetUp = mongoose.connection;

module.exports = mongoDbSetUp;
