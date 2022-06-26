const User = require("../models/User");
const SendEmail = require("../emails/mail");
const {
	welcomeEmailOptions,
	inviteEmailOptions,
	forgotPasswordEmailOptions,
} = require("../emails/emailTemplates");

const StripeApiKey = process.env.NODE_ENV === "production"
? process.env.STRIPE_API_KEY
: process.env.STRIPE_TEST_API_KEY;
const stripe = require("stripe")(StripeApiKey);

const ProductIdToTokens = {
	price_1LDKVdAJKEnyYMFYYjAKemmx: 10,
	price_1LDNRVAJKEnyYMFYetuicXSg: 50,
	price_1LDNT5AJKEnyYMFYD2TpgWKc: 100,
};

module.exports.fullfilPayment = async (session) => {
	const user = await User.findOne({ email: session.customer_details.email });
	const paymentStatus = session.payment_status;
	const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
		limit: 1,
	});
	const productId = lineItems.data[0].price.id;

	console.log("user: ", user);
	console.log("payment status: ", paymentStatus);
	console.log("Amount total: ", session.amount_total);
	console.log("product paid for: ", lineItems.data[0].price.id);

	if (user && paymentStatus == "paid") {
		const nbrOfTokensToAdd = ProductIdToTokens[productId];
		const updatedUser = await User.updateTokensOfUser(
			user._id,
			nbrOfTokensToAdd
		);
	}
};
