const express = require("express");
const { isTrackAuthor, validateTrack } = require("../utils/middlewares");
// controllers
const application = require("../controllers/track");

const router = express.Router();

router
	.get("/", application.onGetAllTracks)
	.get("/:id", application.onGetTrackById)
	.post("/", validateTrack, application.onCreateTrack)
	.put("/:id", isTrackAuthor, validateTrack, application.onEditTrackById)
	.delete("/:id", isTrackAuthor, application.onDeleteTrackById);

module.exports = router;
