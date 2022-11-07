const User = require("../models/User");
const SendEmail = require("../emails/mail");
const {
	welcomeEmailOptions,
	inviteEmailOptions,
	forgotPasswordEmailOptions,
} = require("../emails/emailTemplates");

const StripeApiKey =
	process.env.NODE_ENV === "production"
		? process.env.STRIPE_API_KEY
		: process.env.STRIPE_TEST_API_KEY;
const stripe = require("stripe")(StripeApiKey);

const ProductIdToTokens = {
	price_1LDKVdAJKEnyYMFYYjAKemmx: 10,
	price_1LDNRVAJKEnyYMFYetuicXSg: 50,
	price_1LDNT5AJKEnyYMFYD2TpgWKc: 100,
};

const productIdTofrontendItem =
	process.env.NODE_ENV === "production"
		? {
				price_1LWnTQAJKEnyYMFYZv5EXxDm: "basicBriefPlan", // 10 brief per month
				price_1LWnUvAJKEnyYMFYwiMO2LCo: "proBriefPlan", // 50 brief per month
				price_1LWnUZAJKEnyYMFYINexbfQE: "businessBriefPlan", // unlimited brief
				price_1M1IH6AJKEnyYMFYOYuM62P6: "basicPitchPlan", // 15 pitch per month
				price_1LWnTpAJKEnyYMFYvxvlSM2d: "proPitchPlan", // 50 pitch per month
				price_1LWnRyAJKEnyYMFYcyLTKgMJ: "businessPitchPlan", // unlimited pitch
				price_1LWnSvAJKEnyYMFYMRyTPGDZ: "freePlan", // 1 brief and 5 Pitch per month
		  }
		: {
				price_1LF6GBAJKEnyYMFYHHAsfZxR: "basicBriefPlan",
				price_1LF7HJAJKEnyYMFY5mJ7j6W9: "proBriefPlan",
				price_1LF7IDAJKEnyYMFYIWy343RR: "businessBriefPlan",
				price_1M1IH6AJKEnyYMFYOYuM62P6: "basicPitchPlan",
				price_1LF7JsAJKEnyYMFYKjZbX8j8: "proPitchPlan",
				price_1LF7KPAJKEnyYMFYF44VKJfY: "businessPitchPlan",
				price_1LF80PAJKEnyYMFYZF8MzwUj: "freePlan",
		  };

const updatePlans = async (user, plan) => {
	switch (plan) {
		case "freePlan":
			user.briefTokens = -1;
			user.pitchTokens = 5;
			user.briefSubscriptionPlan = plan;
			user.pitchSubscriptionPlan = plan;
			break;
		case "basicPitchPlan":
			user.pitchTokens = 15;
			user.pitchSubscriptionPlan = plan;
			break;
		case "proPitchPlan":
			user.pitchTokens = 30;
			user.pitchSubscriptionPlan = plan;
			break;
		case "businessPitchPlan":
			user.pitchTokens = -1;
			user.pitchSubscriptionPlan = plan;
			break;
		case "basicBriefPlan":
			user.briefTokens = 5;
			user.briefSubscriptionPlan = plan;
			break;
		case "proBriefPlan":
			user.briefTokens = 15;
			user.briefSubscriptionPlan = plan;
			break;
		case "businessBriefPlan":
			user.briefTokens = -1;
			user.briefSubscriptionPlan = plan;
			break;
	}
	const updatedUser = await User.findByIdAndUpdate(user._id, user, {
		returnDocument: "after",
	});
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
	console.log("product paid for: ", productIdTofrontendItem[productId]);

	// if (user && paymentStatus == "paid") {
	// 	const nbrOfTokensToAdd = ProductIdToTokens[productId];
	// 	const updatedUser = await User.updateTokensOfUser(
	// 		user._id,
	// 		nbrOfTokensToAdd
	// 	);
	// }
};

module.exports.updateSubscription = async (subscription) => {
	const user = await User.findOne({ stripeCustomerId: subscription.customer });
	console.log("Update Subscription for user: ", user.email);
	const productId = subscription.plan.id;
	console.log("Product: ", productId);
	const plan = productIdTofrontendItem[productId];
	console.log("Plan: ", plan);
	updatePlans(user, plan);
};

module.exports.renewTokens = async (invoice) => {
	const user = await User.findOne({ stripeCustomerId: invoice.customer });
	console.log("Renew Subscription for user: ", user.email);
	const productId = invoice.lines.data[0].price.id;
	console.log("Product: ", productId);
	const plan = productIdTofrontendItem[productId];
	console.log("Plan: ", plan);
	updatePlans(user, plan);
};
