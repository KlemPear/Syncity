import React, { useState, useEffect } from "react";
import payments from "../../apis/payments";

const onCheckoutSubmit = async (event, itemId) => {
	event.preventDefault();
	const response = await payments.post(`/create-checkout-session`, { itemId });
	const redirectUrl = response.data;
	window.location.href = redirectUrl;
};

const ProductDisplay = ({ itemId, name, amount }) => (
	<section>
		<div className="product">
			<img
				src="https://i.imgur.com/EHyR2nP.png"
				alt="The cover of Stubborn Attachments"
			/>
			<div className="description">
				<h3>{`${name} Tokens`}</h3>
				<h5>{`$${amount}.00 USD`}</h5>
			</div>
		</div>
		<form onSubmit={(event) => onCheckoutSubmit(event, itemId)}>
			<button type="submit" className="btn primary">
				Checkout
			</button>
		</form>
	</section>
);

const Message = ({ message }) => (
	<section>
		<p>{message}</p>
	</section>
);

export default function SimpleStripe({ itemId, name, amount }) {
	const [message, setMessage] = useState("");
	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if (query.get("success")) {
			setMessage("Order placed! You will receive an email confirmation.");
		}

		if (query.get("canceled")) {
			setMessage(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, []);

	return message ? (
		<Message message={message} />
	) : (
		<ProductDisplay itemId={itemId} name={name} amount={amount} />
	);
}