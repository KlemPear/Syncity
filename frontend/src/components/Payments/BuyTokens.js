import React from "react";
import Paypal from "./Paypal";
import Stripe from "./Stripe";

class BuyTokens extends React.Component {
	constructor(props) {
		super(props);
		this.state = { amount: 0, tokens: 0, itemId: null };
	}

	onSelectOption = (optionAmount, tokens) => {
		this.setState({ amount: optionAmount });
		this.setState({ tokens: tokens });
	};

	onSelectItemId = (itemId) => {
		this.setState({ itemId: itemId });
	};

	render() {
		return (
			<div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<h1>Purchase more tokens</h1>
				<div className="ui very relaxed grid">
					<div className="ui three column row">
						<div
							onClick={() => this.onSelectItemId("smallPitchTokens")}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 10 Tokens<div className="sub header">$1</div>
							</h2>
						</div>
						<div
							onClick={() => this.onSelectItemId("mediumPitchTokens")}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 50 Tokens<div className="sub header">$40</div>
							</h2>
						</div>
						<div
							onClick={() => this.onSelectItemId("largePitchTokens")}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 100 Tokens<div className="sub header">$75</div>
							</h2>
						</div>
					</div>
					<div className="ui one column row">
						<div className="column center aligned">
							{this.state.itemId ? (
								// <Paypal
								// 	currency="USD"
								// 	amount={this.state.amount}
								// 	tokens={this.state.tokens}
								// />
								<Stripe itemId={this.state.itemId} />
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BuyTokens;
