import React from "react";
import { Field, reduxForm } from "redux-form";

class RegisterForm extends React.Component {
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

	renderTextInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<textarea {...input} autoComplete="off" />
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
						name="firstName"
						component={this.renderInput}
						label="First Name"
					/>
					<Field
						name="lastName"
						component={this.renderInput}
						label="Last Name"
					/>
					<Field
						name="email"
						component={this.renderInput}
						label="Email Address"
						type="email"
					/>
					<Field
						name="bio"
						component={this.renderTextInput}
						label="Add a short bio to your profile, include your social media tags so that your profile can be verified"
					/>
					<Field
						name="password"
						component={this.renderInput}
						label="Password"
						type="password"
					/>
					<Field
						name="passwordValidation"
						component={this.renderInput}
						label="Confirm Password"
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
	if (!formValues.firstName) {
		errors.firstName = "You must enter a first name";
	}
	if (!formValues.lastName) {
		errors.lastName = "You must enter a last name";
	}
  if (!formValues.bio) {
		errors.bio = "You must enter a bio";
	}
  if (!formValues.email) {
		errors.email = "You must enter an email address";
	}
  if (!formValues.password) {
		errors.password = "You must enter a password";
	}
  if (formValues.password !== formValues.passwordValidation) {
		errors.passwordValidation = "The passwords do not match";
	}
	return errors;
};

export default reduxForm({
	form: "RegisterForm",
	validate: validate,
})(RegisterForm);
