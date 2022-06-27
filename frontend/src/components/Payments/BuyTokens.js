import React from "react";
import { connect } from "react-redux";
import Paypal from "./Paypal";
import SimpleStripe from "./SimpleStripe";
import Stripe from "./Stripe";

class BuyTokens extends React.Component {
	constructor(props) {
		super(props);
		this.state = { amount: 0, name: null, itemId: null, subscription: false };
	}

	onSelectOption = (optionAmount, tokens) => {
		this.setState({ amount: optionAmount });
		this.setState({ name: tokens });
	};

	onSelectItemId = (itemId, amount, name, subscription = false) => {
		this.setState({ itemId: itemId });
		this.setState({ amount: amount });
		this.setState({ name: name });
		if (subscription) {
			this.setState({ subscription: true });
		} else {
			this.setState({ subscription: false });
		}
	};

	render() {
		return (
			<div>
				<h1>Purchase tokens</h1>
				<div className="ui very relaxed grid">
					<div className="ui three column row">
						<div
							onClick={() =>
								this.onSelectItemId("smallPitchTokens", 10.0, "10 Tokens")
							}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 10 Tokens<div className="sub header">$1</div>
							</h2>
						</div>
						<div
							onClick={() =>
								this.onSelectItemId("mediumPitchTokens", 40.0, "50 Tokens")
							}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 50 Tokens<div className="sub header">$40</div>
							</h2>
						</div>
						<div
							onClick={() =>
								this.onSelectItemId("largePitchTokens", 75.0, "100 Tokens")
							}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 100 Tokens<div className="sub header">$75</div>
							</h2>
						</div>
					</div>

					<h1>Subscribe</h1>
					<div className="ui four column row">
						<div
							onClick={() =>
								this.onSelectItemId("freePlan", "0.00/month", "Free Plan", true)
							}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Free Plan<div className="sub header">$0/month</div>
							</h2>
						</div>
						<div
							onClick={() =>
								this.onSelectItemId(
									"basicBriefPlan",
									"19.00/month",
									"Basic Brief Plan",
									true
								)
							}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Basic Brief Plan<div className="sub header">$19/month</div>
							</h2>
						</div>
						<div
							onClick={() =>
								this.onSelectItemId(
									"proBriefPlan",
									"49.00/month",
									"Pro Brief Plan",
									true
								)
							}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Pro Brief Plan<div className="sub header">$49/month</div>
							</h2>
						</div>
						<div
							onClick={() =>
								this.onSelectItemId(
									"businessBriefPlan",
									"99.00/month",
									"Business Brief Plan",
									true
								)
							}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Business Brief Plan<div className="sub header">$99/month</div>
							</h2>
						</div>
					</div>

					<div className="ui one column row">
						<div className="column center aligned">
							{this.state.itemId ? (
								<SimpleStripe
									itemId={this.state.itemId}
									amount={this.state.amount}
									name={this.state.name}
									userId={this.props.user._id}
									subscription={this.state.subscription}
								/>
							) : null}
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
