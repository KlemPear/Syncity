import React from "react";
import { Field, reduxForm } from "redux-form";

//mui
import { Stack, Box, Button, TextField } from "@mui/material";

class ResetPasswordForm extends React.Component {
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
							name="password"
							component={this.renderInput}
							label="Enter new password"
							type="password"
						/>
						<Field
							name="passwordValidation"
							component={this.renderInput}
							label="Confirm new password"
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
	if (!formValues.password) {
		errors.password = "You must enter an password";
	}
	if (formValues.password !== formValues.passwordValidation) {
		errors.passwordValidation = "The passwords do not match";
	}
	return errors;
};

export default reduxForm({
	form: "ResetPasswordForm",
	validate: validate,
})(ResetPasswordForm);
