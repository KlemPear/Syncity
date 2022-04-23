const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
		clientId: process.env.OAUTH_CLIENTID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
	},
});

transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log("Email Server is ready to send our messages");
	}
});

const sendEmail = (options) => {
	const mailOptions = {
		from: options.fromAddress ?? "do-not-reply@akapela.com",
		to: options.toAddress ?? "",
		subject: options.subject ?? "",
		text: options.text ?? "",
		html: options.html ?? "",
	};

	transporter.sendMail(mailOptions, function (err, data) {
		if (err) {
			console.log("Error " + err);
		} else {
			console.log("Email sent successfully");
		}
	});
};

module.exports = sendEmail;
