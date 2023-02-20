const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = (options) => {
	const mailOptions = {
		//from: options.fromAddress ?? "hugo@nost.audio",
		from: {
			email: options.fromAddress ?? "hugo@nost.audio",
			name: options.emailSignature ?? "Hugo from nost"
		},
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

module.exports.sendMultipleEmails = (options, emailList) => {
	const mailOptions = {
		// from: options.fromAddress ?? "hugo@nost.audio",
		from: {
			email: options.fromAddress ?? "hugo@nost.audio",
			name: options.emailSignature ?? "Hugo from nost"
		},
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
			console.log("Emails sent");
		})
		.catch((error) => {
			console.error(error.response.body);
		});
};
