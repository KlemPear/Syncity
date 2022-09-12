import React from "react";
import { Field, reduxForm } from "redux-form";

//mui
import { Stack, Box, Button, TextField } from "@mui/material";

class ForgotPasswordForm extends React.Component {
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
							name="email"
							component={this.renderInput}
							label="Email Address"
							type="email"
						/>
						<Button type="submit" variant="contained" color="secondary">
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
	if (!formValues.email) {
		errors.email = "You must enter an email address";
	}
	return errors;
};

export default reduxForm({
	form: "ForgotPasswordForm",
	validate: validate,
})(ForgotPasswordForm);
