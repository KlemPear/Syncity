const baseUrl =
	process.env.NODE_ENV === "production"
		? "http://app.akapela.co"
		: "http://localhost:3000";

module.exports.welcomeEmailOptions = (name, confirmationCode, email) => {
	return {
		subject: `Welcome to NOST ${name}!`,
		toAddress: email,
		text: `Thank you for registering to NOST ${name}. We hope you'll like it here! Please verify your email address by clicking on this link: ${baseUrl}/register/confirm/${confirmationCode}`,
		html: `<h1>Welcome to NOST ${name}!</h1><br><h3>thank you for registering.</h3><br><p>We hope that you will like it here :).</p><br><p>Please confirm your email by clicking on the following link</p><a href=${baseUrl}/register/confirm/${confirmationCode}> Click here!</a>`,
	};
};

module.exports.inviteEmailOptions = (inviteFrom, inviteTo) => {
	return {
		subject: `${inviteFrom} would like you to join NOST!`,
		toAddress: inviteTo,
		text: `${inviteFrom} is inviting you to join NOST. Check it out here: ${baseUrl}`,
		html: `<h1>${inviteFrom} is inviting you to join NOST</h1><br><h3>Check it out here: <a href=${baseUrl}>nost.audio</a></h3>`,
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
		html: `<h1>Reset your password</h1><br><h3>${firstName}, reset your password by clicking on this link: <a href=${baseUrl}/forgot-password/reset/${confirmationCode}>Reset Password!</a></h3>`,
	};
};
