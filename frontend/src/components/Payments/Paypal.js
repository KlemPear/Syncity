import React, { useEffect } from "react";
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { addTokensToUser } from "../../actions";
import { connect } from "react-redux";
import history from "../../util/history";

class Paypal extends React.Component {
	render() {
		return (
			<>
				<h3>{`Purchase ${this.props.tokens} tokens for $${this.props.amount}`}</h3>
				<div style={{ maxWidth: "200px", minHeight: "200px" }}>
					<PayPalScriptProvider
						options={{
							"client-id":
								"AaM8D5kv3f0pYcnCn_75x0dOQhod8wjOa9ejf13y9HEdnUIqOVKD3jTXvznTf8zftc-quEeJ8W9FBCxq",
							components: "buttons",
							currency: "USD",
						}}
					>
						<ButtonWrapper
							currency={this.props.currency}
							amount={this.props.amount}
							showSpinner={false}
						/>
					</PayPalScriptProvider>
				</div>
			</>
		);
	}
}

const ButtonWrapper = ({ currency, showSpinner, amount }) => {
	// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
	// This is the main reason to wrap the PayPalButtons in a new component
	const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
	const style = { layout: "vertical" };
	useEffect(() => {
		dispatch({
			type: "resetOptions",
			value: {
				...options,
				currency: currency,
			},
		});
	}, [currency, showSpinner]);

	return (
		<>
			{showSpinner && isPending && <div className="spinner" />}
			<PayPalButtons
				style={style}
				disabled={false}
				forceReRender={[amount, currency, style]}
				fundingSource={undefined}
				createOrder={(data, actions) => {
					return actions.order
						.create({
							purchase_units: [
								{
									amount: {
										currency_code: currency,
										value: amount,
									},
								},
							],
						})
						.then((orderId) => {
							// Your code here after create the order
							return orderId;
						});
				}}
				onApprove={function (data, actions) {
					return actions.order.capture().then(function () {
						// Your code here after capture the order
						this.props.addTokensToUser(
							this.props.currentUser._id,
							this.props.tokens
						);
						history.push("/profile");
					});
				}}
			/>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.auth?.user,
	};
};

export default connect(mapStateToProps, { addTokensToUser })(Paypal);
