import React from "react";
import payments from "../../apis/payments";

//mui
import {
	Button,
} from "@mui/material";

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
			<Button type="submit" variant="contained" color="secondary" size="large">
				Subscribe
			</Button>
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
