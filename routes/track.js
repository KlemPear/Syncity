const express = require("express");
// controllers
const application = require("../controllers/track");

const router = express.Router();

router
	.get("/", application.onGetAllTracks)
	.get("/:id", application.onGetTrackById)
	.post("/", application.onCreateTrack)
	.put("/:id", application.onEditTrackById)
	.delete("/:id", application.onDeleteTrackById);

module.exports = router;
