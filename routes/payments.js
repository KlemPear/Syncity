const express = require("express");
// controllers
const payments = require("../controllers/payments");

const router = express.Router();

router
	.post("/create-payment-intent", payments.onCreatePaymentIntent)
	.post("/create-checkout-session", payments.onCreateCheckoutSession)
	.post("/webhook", payments.onWebhookEvent)
	.get("/success", payments.onPaymentSuccess);

module.exports = router;
