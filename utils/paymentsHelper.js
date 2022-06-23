const User = require("../models/User");
const SendEmail = require("../emails/mail");
const {
	welcomeEmailOptions,
	inviteEmailOptions,
	forgotPasswordEmailOptions,
} = require("../emails/emailTemplates");
const stripe = require("stripe")(
	"sk_test_51L7tnlAJKEnyYMFYvjDVXUFBxF2ZubAOwZLoFdKxS8yJhPawIVGqQMtWa02fw87T40ACNpWMansZCrF2M7XZsyaF00tVXYflEp"
);

module.exports.fullfilPayment = async (session) => {
	//console.log(session);
	const user = await User.findOne({ email: session.customer_details.email });
	console.log("user: ", user);
	console.log("payment status: ", session.payment_status);
};
