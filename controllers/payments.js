const User = require("../models/User");
const SendEmail = require("../emails/mail");
const {
	welcomeEmailOptions,
	inviteEmailOptions,
	forgotPasswordEmailOptions,
} = require("../emails/emailTemplates");

const stripe = require("stripe")(
	"sk_test_51L7uFQItHoi23Au1SvaIgx3kj3KuIxMCJb4BYNLwwvTVjCIpmzQqUHKtXZJLVKqNTbA6sHGqMC5FDExyb0tGcVU500b63Vix1a"
);

const itemToPriceDictionary = {
	smallPitchTokens: 1,
	mediumPitchTokens: 5,
	largePitchTokens: 10,
};

const calculateOrderAmount = (itemId) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return itemToPriceDictionary[itemId];
};

module.exports.onCreatePaymentIntent = async (req, res, next) => {
	try {
		const { itemId } = req.body;
		console.log(itemId);
		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(itemId),
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
