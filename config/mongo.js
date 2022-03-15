const mongoose = require("mongoose");

const db = {
	url: "localhost:27017",
	name: "chatdb",
};

const CONNECTION_URL = `mongodb://${db.url}/${db.name}`;

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
