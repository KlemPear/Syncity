const express = require("express");
// controllers
const payments = require("../controllers/payments");

const router = express.Router();

router
	.post("/create-payment-intent", payments.onCreatePaymentIntent);

module.exports = router;
