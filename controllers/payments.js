const paymentsHelper = require("../utils/paymentsHelper");

const stripe = require("stripe")(
	"sk_test_51L7tnlAJKEnyYMFYvjDVXUFBxF2ZubAOwZLoFdKxS8yJhPawIVGqQMtWa02fw87T40ACNpWMansZCrF2M7XZsyaF00tVXYflEp"
);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
	"whsec_1eda0809488a8d16fa62249513d1a8325a2405054831a826c607599a72e19c51";

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
			success_url:`${baseUrl}/buy-tokens`, // `http://localhost:5000/payments/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${baseUrl}/buy-tokens`,
		});

		res.status(200).json(session.url);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onWebhookEvent = async (req, res, next) => {
	const sig = req.headers["stripe-signature"];
	let event;
	try {
		event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
	} catch (error) {
		console.log(error);
		res.status(400).send(`Webhook Error: ${error.message}`);
		return;
	}
	// Handle the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntent = event.data.object;
			// Then define and call a function to handle the event payment_intent.succeeded
			break;
		// ... handle other event types
		case "checkout.session.completed":
			const session = event.data.object;
			paymentsHelper.fullfilPayment(session);
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	// Return a 200 response to acknowledge receipt of the event
	res.status(200).json();
};

module.exports.onPaymentSuccess = async (req, res, next) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(
			req.query.session_id
		);
		const customer = await stripe.customers.retrieve(session.customer);

		res.send(
			`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
