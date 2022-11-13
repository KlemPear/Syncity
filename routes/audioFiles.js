const express = require("express");
const multer = require("multer");
const { memoryStorage } = require("multer");

const storage = memoryStorage();
const upload = multer({
	storage,
	fileFilter: (file) => {
		return file;
	},
});
// controllers
const audioFiles = require("../controllers/audioFiles");

const router = express.Router();

router
	.get("/", audioFiles.onGetAudioFiles)
	.post("/upload", upload.single("file"), audioFiles.onUploadAudioFiles);

module.exports = router;
