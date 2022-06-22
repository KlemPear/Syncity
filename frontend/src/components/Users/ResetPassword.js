import React from "react";
import { connect } from "react-redux";
import ResetPasswordForm from "./ResetPasswordForm";
import { getUserByConfirmationCode, updateUserPassword } from "../../actions";

class ResetPassword extends React.Component {
	componentDidMount = () => {
		this.props.getUserByConfirmationCode(
			this.props.match.params.confirmationCode
		);
	};

	onSubmit = (formValues) => {
		// http://localhost:3000/forgot-password/reset/RZulVpO6b8OPwxTdLjvtELGTD
		this.props.updateUserPassword(this.props.user.confirmationCode, formValues);
	};

	render() {
		if (!this.props.user) {
			return (
				<div className="container">
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<h1>
						<strong>
							Sorry, we cannot find an account linked to this email.
						</strong>
					</h1>
				</div>
			);
		}
		return (
			<div className="container">
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<h1>
					<strong>Reset your password.</strong>
				</h1>
				<ResetPasswordForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth?.user,
	};
};

export default connect(mapStateToProps, {
	getUserByConfirmationCode,
	updateUserPassword,
})(ResetPassword);