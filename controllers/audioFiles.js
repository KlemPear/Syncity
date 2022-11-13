const { uploadToS3 } = require("../utils/s3");

module.exports.onUploadAudioFiles = async (req, res, next) => {
	try {
		const { file, user } = req;
		if (!file) return res.status(400).json("bad request");
		const { error, key } = await uploadToS3({ file, userId: user._id });
		res.status(200).json({ key });
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
