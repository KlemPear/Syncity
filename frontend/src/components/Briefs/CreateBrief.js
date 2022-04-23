import React from "react";
import { connect } from "react-redux";
import CreateBriefForm from "./CreateBriefForm";
import { createBrief } from "../../actions";
import Modal from "../Modal";
import { Link } from "react-router-dom";

class CreateBrief extends React.Component {
	constructor(props) {
		super(props);
		this.state = { notEnoughTokens: false };
	}
	onSubmit = (formValues) => {
		this.props.createBrief({ ...formValues, author: `${this.props.userId}` });
	};

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

	render() {
		return (
			<div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<h3>Create New Brief</h3>
				<CreateBriefForm
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

export default connect(mapStateToProps, { createBrief })(CreateBrief);
