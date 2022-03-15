import React from "react";
import { Field, reduxForm } from "redux-form";

class LoginForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta, type }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input type={type} {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		//do whatever we need with the form values
		//send to a server, call an api etc...
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Field
						name="username"
						component={this.renderInput}
						label="Email Address"
						type="email"
					/>
					<Field
						name="password"
						component={this.renderInput}
						label="Password"
						type="password"
					/>
					<button className="ui button primary">Submit</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.username) {
		errors.username = "You must enter an email address";
	}
	if (!formValues.password) {
		errors.password = "You must enter a password";
	}
	return errors;
};

export default reduxForm({
	form: "LoginForm",
	validate: validate,
})(LoginForm);
