const express = require("express");
const multer = require("multer");
const { memoryStorage } = require("multer");
const path = require("path");

const storage = memoryStorage();
const upload = multer({
	storage,
	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== ".mp3" && ext !== ".wav") {
			return callback(new Error("Only .mp3 and .wav are allowed"));
		}
		callback(null, true);
	},
});
// controllers
const audioFiles = require("../controllers/audioFiles");

const router = express.Router();

router
	.get("/", audioFiles.onGetAudioFiles)
	.post("/upload", upload.single("file"), audioFiles.onUploadAudioFiles);

module.exports = router;
