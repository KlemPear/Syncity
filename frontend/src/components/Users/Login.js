import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { loginUser } from "../../actions";

class Login extends React.Component {
	onSubmit = (formValues) => {
		this.props.loginUser(formValues);
	};

	renderUnauthorizedMessage = () => {
		return (
			<div>
				<p>These user name and/or password are not recognized</p>
			</div>
		);
	};

	render() {
		return (
			<div>
				<h3>Login</h3>
				{this.props.unauthorized ? this.renderUnauthorizedMessage() : null}
				<LoginForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		unauthorized: state.auth.unauthorized,
	};
};

export default connect(mapStateToProps, { loginUser })(Login);
