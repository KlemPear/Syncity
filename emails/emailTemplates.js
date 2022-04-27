const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://syncity.herokuapp.com"
		: "http://localhost:3000";

module.exports.welcomeEmailOptions = (name, confirmationCode, email) => {
	return {
		subject: `Welcome to akapela ${name}!`,
		toAddress: email,
		text: `Thank you for registering to akapela ${name}. We hope you'll like it here! Please verify your email address by clicking on this link: ${baseUrl}/register/confirm/${confirmationCode}`,
		html: `<h1>Welcome to akapela ${name}!</h1><br><h3>thank you for registering.</h3><br><p>We hope that you will like it here :).</p><br><p>Please confirm your email by clicking on the following link</p><a href=${baseUrl}/register/confirm/${confirmationCode}> Click here!</a>`,
	};
};

module.exports.InviteEmailOptions = (inviteFrom, inviteTo) => {
	return {
		subject: `${inviteFrom} would like you to join akapela!`,
		toAddress: inviteTo,
		text: `${inviteFrom} is inviting you to join akapela. Check it out here: ${baseUrl}`,
		html: `<h1>${inviteFrom} is inviting you to join akapela</h1><br><h3>Check it out here: <a href=${baseUrl}>akapela.co</a></h3>`,
	};
};
