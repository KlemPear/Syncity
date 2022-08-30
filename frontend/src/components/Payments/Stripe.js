import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeCheckoutForm from "./StripeCheckoutForm";
import "./StripeCheckoutForm.css";
import payments from "../../apis/payments";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
	"pk_test_51L7tnlAJKEnyYMFYvezpbVOJNUjONpVLlbXHxjtaJjzBSwSphSqJ19Et68ulMIyfGpEhaDYozIk3aFei7ytKMPDS008JEaf2vN"
);

export default function Stripe(props) {
	const [clientSecret, setClientSecret] = useState("");
	useEffect(() => {
		async function fetchData() {
			const response = await payments.post(`/create-payment-intent`, props);
			setClientSecret(response.data.clientSecret);
		}
		fetchData();
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
					<StripeCheckoutForm />
				</Elements>
			)}
		</div>
	);
}
