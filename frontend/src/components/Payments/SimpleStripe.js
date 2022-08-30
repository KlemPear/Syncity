import React from "react";
import payments from "../../apis/payments";

const onCheckoutSubmit = async (event, itemId, userId, subscription) => {
	event.preventDefault();
	const response = await payments.post(`/create-checkout-session`, {
		itemId,
		userId,
		subscription,
	});
	const redirectUrl = response.data;
	window.location.href = redirectUrl;
};

const ProductDisplay = ({ itemId, userId, subscription }) => (
	<section>
		<form
			onSubmit={(event) =>
				onCheckoutSubmit(event, itemId, userId, subscription)
			}
		>
			<button type="submit" className="ui button primary">
				Subscribe
			</button>
		</form>
	</section>
);

export default function SimpleStripe({ itemId, userId, subscription = true}) {
	return (
		<>
			<ProductDisplay
				itemId={itemId}
				userId={userId}
				subscription={subscription}
			/>
		</>
	);
}
