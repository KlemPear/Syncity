const { uploadToS3, getAudioFile, getAudioFileStream } = require("../utils/s3");
const { parse, stringify, toJSON, fromJSON } = require("flatted");

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
		const { key } = req.query;
		const { error, data } = await getAudioFile(key);
		if (error) return res.status(500).json(error);
		res.attachment(key);
		data.Body.pipe(res);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
