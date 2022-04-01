import React from "react";
import Paypal from "./Paypal";

class BuyTokens extends React.Component {
	constructor(props) {
		super(props);
		this.state = { amount: 0 };
	}

	onSelectOption = (optionAmount) => {
		this.setState({ amount: optionAmount });
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
							onClick={() => this.onSelectOption(10)}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 10 Tokens<div className="sub header">$10</div>
							</h2>
						</div>
						<div
							onClick={() => this.onSelectOption(40)}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 50 Tokens<div className="sub header">$40</div>
							</h2>
						</div>
						<div
							onClick={() => this.onSelectOption(75)}
							className="column ui very padded center aligned segment"
						>
							<h2 className="ui header">
								Buy 100 Tokens<div className="sub header">$75</div>
							</h2>
						</div>
					</div>
					<div className="ui one column row">
						<div className="column center aligned">
							{this.state.amount > 0 ? (
								<Paypal currency="USD" amount={this.state.amount} />
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BuyTokens;
