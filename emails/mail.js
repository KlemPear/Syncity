const nodemailer = require("nodemailer");

//Google GMAIL
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
// 	process.env.OAUTH_CLIENTID, // ClientID
// 	process.env.OAUTH_CLIENT_SECRET, // Client Secret
// 	"https://developers.google.com/oauthplayground" // Redirect URL
// );

// oauth2Client.setCredentials({
// 	refresh_token: process.env.OAUTH_REFRESH_TOKEN,
// });
// const accessToken = oauth2Client.getAccessToken();

// const transporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		type: "OAuth2",
// 		user: process.env.MAIL_USERNAME,
// 		pass: process.env.MAIL_PASSWORD,
// 		clientId: process.env.OAUTH_CLIENTID,
// 		clientSecret: process.env.OAUTH_CLIENT_SECRET,
// 		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
// 		accessToken: accessToken,
// 	},
// 	tls: {
// 		rejectUnauthorized: false,
// 	},
// });

const transporter = nodemailer.createTransport({
	host: "smtp.sendgrid.net",
	port: 587,
	auth: {
		user: "apikey",
		pass: process.env.SENDGRID_API_KEY,
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
		from: options.fromAddress ?? "do-not-reply@akapela.co",
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
