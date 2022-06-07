import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./StripeCheckoutForm";
import payments from "../../apis/payments";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
	"pk_test_51L7uFQItHoi23Au1PZ3w7fzYv5O69MdB1t7Eeg4qkEui5qBN2IWGvBd4BpT7gA1yKvAO96Vj5rdl8O7bkAQwstVo00thGwU8Ma"
);

export default function Stripe(itemId) {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(async () => {
		const response = await payments.post(`/create-payment-intent`, itemId);
		setClientSecret(response.data.clientSecret);
	}, []);

	//Create PaymentIntent as soon as the page loads
	// 	fetch("/create-payment-intent", {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ itemId: itemId }),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => setClientSecret(data.clientSecret));
	// }, []);

	const appearance = {
		theme: "flat",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="Stripe">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
