const {
	S3Client,
	PutObjectCommand,
	ListObjectsV2Command,
	GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");

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
		Prefix: userId,
	});
	const { Contents = [] } = await s3.send(command);
	return Contents.map((file) => file.key);
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
