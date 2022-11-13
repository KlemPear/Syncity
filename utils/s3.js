const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");

const s3 = new S3Client({
	region: "us-east-2",
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
		console.log(key);
		return { error: "", key: key };
	} catch (error) {
		console.log(error);
		return { error: error, key: key };
	}
};
