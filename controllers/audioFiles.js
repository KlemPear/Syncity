const {
	uploadToS3,
	getAudioFile,
	getAudioFileStream,
	getAudioFileStream2,
} = require("../utils/s3");
const fs = require("fs");
const { start } = require("repl");

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
		//data.Body.pipe(res);
		const stream = data.Body;
		stream.pipe(res);
		stream.on("end", res.end);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onStreamAudioFiles = async (req, res, next) => {
	try {
		const { key } = req.query;
		const { error, data } = getAudioFileStream(key);
		//console.log(data);
		data.on("data", (chunk) => {
			res.write(chunk);
		});

		data.on("error", () => {
			res.sendStatus(404);
		});

		data.on("end", () => {
			res.end();
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onStreamAudioFiles2 = async (req, res, next) => {
	try {
		const CHUNK_SIZE = 1024 * 256; //256kb
		const range =
			req.headers.range && req.headers.range !== "bytes=0-"
				? req.headers.range
				: `bytes=0-${CHUNK_SIZE}`;
		const { key } = req.query;
		const { error, data } = getAudioFileStream2(key, range);
		data.then((response) => {
			const headers = {
				"Content-Range": response.ContentRange,
				"Accept-Ranges": response.AcceptRanges,
				"Content-Length": response.ContentLength,
				"Content-Type": response.ContentType,
			};
			res.writeHead(206, headers);
			const audioStream = response.Body;
			audioStream.pipe(res);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
