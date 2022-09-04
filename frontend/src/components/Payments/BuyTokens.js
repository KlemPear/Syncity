import React from "react";
import { connect } from "react-redux";
import SimpleStripe from "./SimpleStripe";

class BuyTokens extends React.Component {
	constructor(props) {
		super(props);
		this.state = { briefPlans: true };
	}

	onSelectBriefPlans = () => {
		this.setState({ briefPlans: true });
	};

	onSelectPitchPlans = () => {
		this.setState({ briefPlans: false });
	};

	renderPlanOption = (itemId, amount, name, user, description = null) => {
		return (
			<div className="column ui very padded center aligned segment">
				<h2 className="ui header">
					{name}
					<div className="sub header">${amount}</div>
				</h2>
				<div className="">{description}</div>
				<SimpleStripe
					itemId={itemId}
					amount={amount}
					name={name}
					userId={user._id}
				/>
			</div>
		);
	};

	renderBriefPlans = () => {
		return (
			<div className="ui four column row">
				{this.renderPlanOption(
					"freePlan",
					"0.00/month",
					"Free Plan",
					this.props.user,
					"1 brief per month."
				)}
				{this.renderPlanOption(
					"basicBriefPlan",
					"19.00/month",
					"Basic Brief Plan",
					this.props.user,
					"5 briefs per month"
				)}
				{this.renderPlanOption(
					"proBriefPlan",
					"49.00/month",
					"Pro Brief Plan",
					this.props.user,
					"15 briefs per month"
				)}
				{this.renderPlanOption(
					"businessBriefPlan",
					"99.00/month",
					"Business Brief Plan",
					this.props.user,
					"Unlimited briefs."
				)}
			</div>
		);
	};

	renderPitchPlans = () => {
		return (
			<div className="ui four column row">
				{this.renderPlanOption(
					"freePlan",
					"0.00/month",
					"Free Plan",
					this.props.user,
					"5 applications per month"
				)}
				{this.renderPlanOption(
					"basicPitchPlan",
					"15.00/month",
					"Basic Applications Plan",
					this.props.user,
					"25 applications per month"
				)}
				{this.renderPlanOption(
					"proPitchPlan",
					"29.00/month",
					"Pro Applications Plan",
					this.props.user,
					"50 applications per month"
				)}
				{this.renderPlanOption(
					"businessPitchPlan",
					"49.00/month",
					"Business Applications Plan",
					this.props.user,
					"Unlimited applications."
				)}
			</div>
		);
	};

	render() {
		return (
			<div>
				<h1>Subscription Plans</h1>
				<button
					className="ui left attached button"
					onClick={() => this.onSelectBriefPlans()}
				>
					I need music
				</button>
				<button
					className="right attached ui button"
					onClick={() => this.onSelectPitchPlans()}
				>
					I make music
				</button>
				{this.state.briefPlans
					? this.renderBriefPlans()
					: this.renderPitchPlans()}
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
