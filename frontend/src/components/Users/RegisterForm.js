import React from "react";
import { Field, reduxForm } from "redux-form";

//mui
import { Stack, Box, Button, TextField } from "@mui/material";

class RegisterForm extends React.Component {
	renderInput = ({
		input,
		label,
		type,
		meta: { touched, error },
		...custom
	}) => {
		return (
			<>
				<TextField
					sx={{ minWidth: 300 }}
					fullWidth
					label={label}
					error={Boolean(touched && error)}
					helperText={Boolean(touched && error) ? error : null}
					type={type}
					{...input}
					{...custom}
				/>
			</>
		);
	};

	renderTextInput = ({
		input,
		label,
		type,
		meta: { touched, error },
		...custom
	}) => {
		return (
			<>
				<TextField
					fullWidth
					label={label}
					error={Boolean(touched && error)}
					helperText={Boolean(touched && error) ? error : null}
					type={type}
					multiline
					maxRows={4}
					{...input}
					{...custom}
				/>
			</>
		);
	};

	onSubmit = (formValues) => {
		//do whatever we need with the form values
		//send to a server, call an api etc...
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<Box>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Stack spacing={2}>
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
							name="sponsorCode"
							component={this.renderInput}
							label="Enter Ambassador code here (optional)"
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
						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="secondary"
						>
							Submit
						</Button>
					</Stack>
				</form>
			</Box>
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
	// if (!formValues.bio) {
	// 	errors.bio = "You must enter a bio";
	// }
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
