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

const itemToProductId = {
	//price is in cents.
	smallPitchTokens: "price_1LDKVdAJKEnyYMFYYjAKemmx",
	mediumPitchTokens: "price_1LDNRVAJKEnyYMFYetuicXSg",
	largePitchTokens: "price_1LDNT5AJKEnyYMFYD2TpgWKc",
};

const itemToPrice = {
	//price is in cents.
	smallPitchTokens: 10 * 100,
	mediumPitchTokens: 50 * 100,
	largePitchTokens: 100 * 100,
};

const baseUrl =
	process.env.NODE_ENV === "production"
		? "http://app.nost.audio"
		: "http://localhost:3000";

const calculateOrderAmount = (itemId) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return itemToPrice[itemId];
};

module.exports.onCreatePaymentIntent = async (req, res, next) => {
	try {
		const { itemId, user } = req.body;
		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(itemId),
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
			receipt_email: user.email,
		});
		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onCreateCheckoutSession = async (req, res, next) => {
	try {
		const { itemId } = req.body;
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
					price: itemToProductId[itemId],
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `${baseUrl}/stripe-success`,
			cancel_url: `${baseUrl}/buy-tokens`,
		});

		res.status(200).json(session.url);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
