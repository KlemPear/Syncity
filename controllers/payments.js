const paymentsHelper = require("../utils/paymentsHelper");
const User = require("../models/User");

const StripeApiKey =
	process.env.NODE_ENV === "production"
		? process.env.STRIPE_API_KEY
		: process.env.STRIPE_TEST_API_KEY;

const stripe = require("stripe")(StripeApiKey);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
	process.env.NODE_ENV === "production"
		? process.env.STRIPE_WEBHOOK_ENDPOINT
		: process.env.STRIPE_TEST_WEBHOOK_ENDPOINT;

const frontendItemToProductId =
	process.env.NODE_ENV === "production"
		? {
				basicBriefPlan: "price_1LWnTQAJKEnyYMFYZv5EXxDm",
				proBriefPlan: "price_1LWnUvAJKEnyYMFYwiMO2LCo",
				businessBriefPlan: "price_1LWnUZAJKEnyYMFYINexbfQE",
				basicPitchPlan: "price_1M1IH6AJKEnyYMFYOYuM62P6",
				proPitchPlan: "price_1LWnTpAJKEnyYMFYvxvlSM2d",
				businessPitchPlan: "price_1LWnRyAJKEnyYMFYcyLTKgMJ",
				freePlan: "price_1LWnSvAJKEnyYMFYMRyTPGDZ",
		  }
		: {
				basicBriefPlan: "price_1LF6GBAJKEnyYMFYHHAsfZxR",
				proBriefPlan: "price_1LF7HJAJKEnyYMFY5mJ7j6W9",
				businessBriefPlan: "price_1LF7IDAJKEnyYMFYIWy343RR",
				basicPitchPlan: "price_1LF7JJAJKEnyYMFYPijW95kO",
				proPitchPlan: "price_1LF7JsAJKEnyYMFYKjZbX8j8",
				businessPitchPlan: "price_1LF7KPAJKEnyYMFYF44VKJfY",
				freePlan: "price_1LF80PAJKEnyYMFYZF8MzwUj",
		  };

const itemToPrice = {
	//price is in cents.
	smallPitchTokens: 10 * 100,
	mediumPitchTokens: 50 * 100,
	largePitchTokens: 100 * 100,
};

const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://app.nost.audio"
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
		const { itemId, userId, subscription } = req.body;
		const user = await User.findById(userId);
		if (!user.stripeCustomerId) {
			const customer = await stripe.customers.create({
				email: user.email,
				description: userId,
				name: user.firstName + " " + user.lastName,
			});
			user.stripeCustomerId = customer.id;
			const updatedUser = await User.findByIdAndUpdate(userId, user, {
				returnDocument: "after",
			});
		}
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
					price: frontendItemToProductId[itemId],
					quantity: 1,
				},
			],
			mode: subscription ? "subscription" : "payment",
			customer: user.stripeCustomerId ?? updatedUser.stripeCustomerId,
			success_url: `${baseUrl}/payment-success`, // `http://localhost:5000/payments/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${baseUrl}/paymentcanceled`,
		});

		res.status(200).json(session.url);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onCreatePortalSession = async (req, res, next) => {
	try {
		const { customerId } = req.body;
		const returnUrl = `${baseUrl}/profile`;

		const portalSession = await stripe.billingPortal.sessions.create({
			customer: customerId,
			return_url: returnUrl,
		});

		res.status(200).json(portalSession.url);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onWebhookEvent = async (req, res, next) => {
	//stripe listen --forward-to localhost:5000/payments/webhook
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
			// paymentsHelper.fullfilPayment(session);
			break;
		case "customer.subscription.trial_will_end":
			subscription = event.data.object;
			status = subscription.status;
			console.log(`Subscription status is ${status}.`);
			// Then define and call a method to handle the subscription trial ending.
			// handleSubscriptionTrialEnding(subscription);
			break;
		case "customer.subscription.deleted":
			subscription = event.data.object;
			status = subscription.status;
			console.log(`Subscription status is ${status}.`);
			// Then define and call a method to handle the subscription deleted.
			// handleSubscriptionDeleted(subscriptionDeleted);
			break;
		case "customer.subscription.created":
			subscription = event.data.object;
			status = subscription.status;
			console.log(`Subscription status is ${status}.`);
			// Then define and call a method to handle the subscription created.
			// handleSubscriptionCreated(subscription);
			break;
		case "customer.subscription.updated":
			subscription = event.data.object;
			status = subscription.status;
			console.log(`Subscription status is ${status}.`);
			paymentsHelper.updateSubscription(subscription);
			// Then define and call a method to handle the subscription update.
			// handleSubscriptionUpdated(subscription);
			break;
		case "invoice.paid":
			invoice = event.data.object;
			status = invoice.status;
			console.log(`Subscription status is ${status}.`);
			paymentsHelper.renewTokens(invoice);
			// Then define and call a method to handle the subscription update.
			// handleSubscriptionUpdated(subscription);
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
