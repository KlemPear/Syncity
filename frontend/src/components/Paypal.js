import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

class Paypal extends React.Component {
	render() {
		return (
			<>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<PayPalScriptProvider options={{ "client-id": "test" }}>
					<PayPalButtons
						createOrder={(data, actions) => {
							return actions.order.create({
								purchase_units: [
									{
										amount: {
											value: "1",
										},
									},
								],
							});
						}}
						onApprove={(data, actions) => {
							return actions.order.capture().then((details) => {
								const name = details.payer.name.given_name;
								alert(`Transaction completed by ${name}`);
							});
						}}
					/>
				</PayPalScriptProvider>
			</>
		);
	}
}

export default Paypal;
