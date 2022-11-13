const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");

const s3 = new S3Client({ region: "REGION" });
const BUCKET = process.env.BUCKET;

module.exports.uploadToS3 = async ({ file, userId }) => {
	const key = `${userId}/${uuid()}`;
	const command = new PutObjectCommand({
		Bucket: BUCKET,
		Key: key,
		Body: file.buffer,
		contentType: file.mimetype,
	});
	try {
		await s3.send(command);
		return { key };
	} catch (error) {
		console.log(error);
		return { error };
	}
};
