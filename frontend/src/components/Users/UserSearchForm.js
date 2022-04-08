import React from "react";
import { Field, reduxForm } from "redux-form";

class UserSearchForm extends React.Component {
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
						name="email"
						component={this.renderInput}
						type={"email"}
						label="Email Address"
					/>
					<button className="ui button primary">Search</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.email) {
		errors.firstName = "You must enter an email";
	}
	return errors;
};

export default reduxForm({
	form: "UserSearchForm",
	validate: validate,
})(UserSearchForm);
