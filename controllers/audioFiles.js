const { uploadToS3 } = require("../utils/s3");

module.exports.onUploadAudioFiles = async (req, res, next) => {
	try {
		console.log("here");
		const { file, user } = req;
		console.log("Audio Files Request: ", file);
		console.log("User: ", user);
		const userId = user._id;
		if (!file) return res.status(400).json("bad request");
		const { error, key } = uploadToS3({ file, userId });
		res.status(200).json({ fileId: 123465 });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onGetAudioFiles = async (req, res, next) => {
	try {
		console.log(req.body);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
