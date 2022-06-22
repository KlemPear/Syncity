import React from "react";
import { connect } from "react-redux";
import Paypal from "./Paypal";
import SimpleStripe from "./SimpleStripe";
import Stripe from "./Stripe";

class BuyTokens extends React.Component {
	constructor(props) {
		super(props);
		this.state = { amount: 0, name: null, itemId: null };
	}

	onSelectOption = (optionAmount, tokens) => {
		this.setState({ amount: optionAmount });
		this.setState({ name: tokens });
	};

	onSelectItemId = (itemId, amount, tokens) => {
		this.setState({ itemId: itemId });
		this.setState({ amount: amount });
		this.setState({ name: tokens });
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
							onClick={() => this.onSelectItemId("smallPitchTokens", 10, 10)}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 10 Tokens<div className="sub header">$1</div>
							</h2>
						</div>
						<div
							onClick={() => this.onSelectItemId("mediumPitchTokens", 40, 50)}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 50 Tokens<div className="sub header">$40</div>
							</h2>
						</div>
						<div
							onClick={() => this.onSelectItemId("largePitchTokens", 75, 100)}
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
								<SimpleStripe
									itemId={this.state.itemId}
									amount={this.state.amount}
									name={this.state.name}
								/>
							) : // <Stripe itemId={this.state.itemId} user={this.props.user} />
							null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, null)(BuyTokens);
