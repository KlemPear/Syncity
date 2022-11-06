const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://app.nost.audio"
		: "http://localhost:3000";

const dateFormatter = (date) => {
	return new Date(date).toLocaleDateString("en-Us");
};

const moneyFormatter = Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 2,
});

module.exports.welcomeEmailOptions = (name, confirmationCode, email) => {
	return {
		subject: `Welcome to NOST ${name}!`,
		toAddress: email,
		text: `Thank you for registering to NOST ${name}. We hope you'll like it here! Please verify your email address by clicking on this link: ${baseUrl}/register/confirm/${confirmationCode}`,
		html: `<h1>Welcome to NOST ${name}!</h1><br><h3>thank you for registering.</h3><br><p>We hope that you will like it here :).</p><br><p>Please confirm your email by clicking on the following link</p><a href=${baseUrl}/register/confirm/${confirmationCode}> Click here!</a>`,
		templateId: "d-0125761b328c40a88862ebbd4e9ea32e",
		dynamicTemplateData: {
			url: `${baseUrl}/register/confirm/${confirmationCode}`,
			first_name: name,
		},
	};
};

module.exports.inviteEmailOptions = (inviteFrom, inviteTo) => {
	return {
		subject: `${inviteFrom} would like you to join NOST!`,
		toAddress: inviteTo,
		text: `${inviteFrom} is inviting you to join NOST. Check it out here: ${baseUrl}`,
		html: `<h1>${inviteFrom} is inviting you to join NOST</h1><br><h3>Check it out here: <a href=${baseUrl}>nost.audio</a></h3>`,
		templateId: "d-03e2ecf501aa4177a91f1a40fa2de3d5",
		dynamicTemplateData: {
			first_name: inviteFrom,
		},
	};
};

module.exports.forgotPasswordEmailOptions = (
	firstName,
	confirmationCode,
	email
) => {
	return {
		subject: `Reset your NOST password ${firstName}`,
		toAddress: email,
		text: `${firstName}, please reset your password by clicking on here: ${baseUrl}/forgot-password/reset/${confirmationCode}`,
		html: "<p>Hello World!</p>",
		templateId: "d-4bf32a98360646acbf195b5e0fbe24d7",
		dynamicTemplateData: {
			url: `${baseUrl}/forgot-password/reset/${confirmationCode}`,
			first_name: firstName,
		},
	};
};

module.exports.newBriefEmailOptions = (
	briefTitle,
	briefDeadline,
	briefMedia,
	briefGenre,
	briefBudget,
	briefId
) => {
	return {
		subject: `There is a new brief on nost: ${briefTitle}`,
		text: `There is a new brief on nost, check it out at https://app.nost.audio`,
		html: "<p>Hello World!</p>",
		templateId: "d-569347cd97224b40a424dbaa1fff34b0",
		dynamicTemplateData: {
			brief_title: briefTitle,
			brief_media: briefMedia,
			brief_deadline: dateFormatter(briefDeadline),
			brief_id: briefId,
			brief_genre: briefGenre,
			brief_budget: moneyFormatter.format(briefBudget),
		},
	};
};
