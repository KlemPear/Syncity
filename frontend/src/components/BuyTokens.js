import React from "react";
import Paypal from "./Paypal";

class BuyTokens extends React.Component {
	render() {
		return (
			<div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<h1>Purchase more tokens</h1>
				<Paypal currency="USD" amount="1" />
			</div>
		);
	}
}

export default BuyTokens;
