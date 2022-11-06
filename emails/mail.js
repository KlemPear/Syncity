const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (options) => {
	const mailOptions = {
		from: options.fromAddress ?? "hugo@nost.audio",
		to: options.toAddress ?? "",
		subject: options.subject ?? "",
		text: options.text ?? "",
		html: options.html ?? "",
		templateId: options.templateId ?? "",
		dynamicTemplateData: options.dynamicTemplateData ?? {},
	};

	sgMail
		.send(mailOptions)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error.response.body);
		});
};

module.exports = sendEmail;

const sendMultipleEmails = (options, emailList) => {
	const mailOptions = {
		from: options.fromAddress ?? "hugo@nost.audio",
		to: emailList ?? "",
		subject: options.subject ?? "",
		text: options.text ?? "",
		html: options.html ?? "",
		templateId: options.templateId ?? "",
		dynamicTemplateData: options.dynamicTemplateData ?? {},
	};

	sgMail
		.sendMultiple(mailOptions)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error.response.body);
		});
};

module.exports = sendMultipleEmails;
