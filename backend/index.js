if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();

const port = process.env.PORT || "5000";
const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
app.set("port", port);

app.get("/", (req, res) => {
	res.send("Syncity");
});

app.use("*", (req, res) => {
	return res.status(404).json({
		success: false,
		message: "API endpoint does not exist",
	});
});

app.listen(port, () => {
  console.log(`Listening on port: http://localhost:${port}/`);
});
