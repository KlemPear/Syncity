import React from "react";
import { connect } from "react-redux";
import BriefApplicationForm from "./BriefApplicationForm";
import { createApplication, addTokensToUser } from "../../actions";
import Modal from "../Modal";
import { Link } from "react-router-dom";

class BriefApplication extends React.Component {
	constructor(props) {
		super(props);
		this.state = { notEnoughTokens: false };
	}
	onNotEnoughTokens = () => {
		this.setState({ notEnoughTokens: true });
	};

	renderModalContent() {
		return (
			<div>You do not have enough tokens to do this. Consider buying more!</div>
		);
	}

	renderModalActions() {
		return (
			<React.Fragment>
				<Link to="/buy-tokens" className="ui button blue">
					Buy Tokens
				</Link>
			</React.Fragment>
		);
	}

	onSubmit = (formValues) => {
		this.props.addTokensToUser(this.props.userId, -1);
		this.props.createApplication({
			...formValues,
			author: `${this.props.userId}`,
			brief: `${this.props.briefId}`,
		});
	};

	render() {
		return (
			<div>
				<h3>Submit an application</h3>
				<BriefApplicationForm
					onSubmit={this.onSubmit}
					onNotEnoughTokens={this.onNotEnoughTokens}
				/>
				{this.state.notEnoughTokens ? (
					<Modal
						title={"Not Enough Tokens"}
						content={this.renderModalContent()}
						actions={this.renderModalActions()}
						onDismiss={() => this.setState({ notEnoughTokens: false })}
					/>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { createApplication, addTokensToUser })(
	BriefApplication
);
