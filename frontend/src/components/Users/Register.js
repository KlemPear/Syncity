import React from "react";
import { connect } from "react-redux";
import RegisterForm from "./RegisterForm";
import { registerUser } from "../../actions";

class Register extends React.Component {
	onSubmit = (formValues) => {
		const user = {
			firstName: formValues.firstName,
			lastName: formValues.lastName,
			bio: formValues.bio,
			email: formValues.email,
			username: formValues.email,
		};
		const body = {
			user: user,
			password: formValues.password,
		};
		//send data to server
		this.props.registerUser(body);
	};

	render() {
		return (
			<div>
				<h3>Register</h3>
				<RegisterForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(null, { registerUser })(Register);
