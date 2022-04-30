import React from "react";
import { connect } from "react-redux";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { userForgotPassword } from "../../actions";

class ForgotPassword extends React.Component {
	onSubmit = (formValues) => {
		this.props.userForgotPassword(formValues);
	};

	renderResults() {
		if (this.props.userNotFound) {
			return (
				<div>
					<p>Sorry, this email does not correspond to any account.</p>
				</div>
			);
		}
		if (this.props.user) {
			return (
				<div>
					<p>We sent an email to your address. Check your mailbox!</p>
				</div>
			);
		}
		return null;
	}

	render() {
		return (
			<div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<p>
					Submit your email address, if it matches one of our accounts we will
					send you an email to reset your password.
				</p>
				<ForgotPasswordForm onSubmit={this.onSubmit} />
				{this.renderResults()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userNotFound: state.auth.userNotFound,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { userForgotPassword })(ForgotPassword);
