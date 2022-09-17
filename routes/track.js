const express = require("express");
const { isTrackAuthor } = require("../utils/middlewares");
// controllers
const application = require("../controllers/track");

const router = express.Router();

router
	.get("/", application.onGetAllTracks)
	.get("/:id", application.onGetTrackById)
	.post("/", application.onCreateTrack)
	.put("/:id", isTrackAuthor, application.onEditTrackById)
	.delete("/:id", isTrackAuthor, application.onDeleteTrackById);

module.exports = router;
