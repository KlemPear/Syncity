const {
	S3Client,
	PutObjectCommand,
	ListObjectsV2Command,
	GetObjectCommand,
	DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");
const AWS = require("aws-sdk");
const Track = require("../models/Track");

const aws = new AWS.S3({
	region: "us-east-2",
	apiVersion: "2006-03-01",
});

const s3 = new S3Client({
	region: "us-east-2",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});
const BUCKET = process.env.BUCKET;

module.exports.uploadToS3 = async ({ file, userId }) => {
	const key = `${userId}/${uuid()}`;
	const command = new PutObjectCommand({
		Bucket: BUCKET,
		Key: key,
		Body: file.buffer,
		ContentType: file.mimetype,
	});
	try {
		await s3.send(command);
		return { error: "", key: key };
	} catch (error) {
		console.log(error);
		return { error: error, key: key };
	}
};

module.exports.getFileKeysByUser = async (userId) => {
	const command = new ListObjectsV2Command({
		Bucket: BUCKET,
		Prefix: userId + "/",
	});
	const { Contents = [] } = await s3.send(command);
	return Contents.map((file) => file.Key);
};

module.exports.deleteFileByKey = async (key) => {
	if (!key) return null;
	const command = new DeleteObjectCommand({
		Bucket: BUCKET,
		Key: key,
	});
	try {
		const data = await s3.send(command);
		return { error: null, data: data };
	} catch (error) {
		console.log(error);
		return { error: error, data: null };
	}
};

module.exports.pruneAudioFilesByUserId = async (userId) => {
	const userBucketFileKeys = await this.getFileKeysByUser(userId);
	const tracks = await Track.find({ author: userId });
	const userDbFileKeys = [];
	tracks.map(
		(track) =>
			track.audioFile?.key != null && userDbFileKeys.push(track.audioFile?.key)
	);
	const keysToDelete = userBucketFileKeys.filter(
		(x) => !userDbFileKeys.includes(x)
	);
	keysToDelete.map(async (key) => {
		const { error, data } = await this.deleteFileByKey(key);
		if (error) console.log(error);
	});
};

module.exports.getAudioFile = async (key) => {
	const command = new GetObjectCommand({
		Bucket: BUCKET,
		Key: key,
	});
	try {
		const data = await s3.send(command);
		return { error: null, data: data };
	} catch (error) {
		console.log(error);
		return { error: error, data: null };
	}
};

module.exports.getAudioFileStream = (key) => {
	const s3Config = {
		Bucket: BUCKET,
		Key: key,
	};
	try {
		let readStream = aws.getObject(s3Config).createReadStream();
		return { error: null, data: readStream };
	} catch (error) {
		console.log(error);
		return { error: error, data: null };
	}
};

module.exports.getAudioFileStream2 = (key, range) => {
	const command = new GetObjectCommand({
		Bucket: BUCKET,
		Key: key,
		Range: range,
	});
	try {
		const data = s3.send(command);
		return { error: null, data: data };
	} catch (error) {
		console.log(error);
		return { error: error, data: null };
	}
};
