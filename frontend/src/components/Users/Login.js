import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { loginUser } from "../../actions";
import { Link } from "react-router-dom";

class Login extends React.Component {
	onSubmit = (formValues) => {
		this.props.loginUser(formValues);
	};

	renderUnauthorizedMessage = () => {
		return (
			<div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<p>
					These user name and/or password are not recognized. Or you have not
					verified your email address yet. Please check your mailbox!
				</p>
			</div>
		);
	};

	render() {
		return (
			<div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<h3>Login</h3>
				{this.props.unauthorized ? this.renderUnauthorizedMessage() : null}
				<LoginForm onSubmit={this.onSubmit} />
				<div>
					<Link to="/forgot-password">Forgot Password?</Link>
				</div>
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
