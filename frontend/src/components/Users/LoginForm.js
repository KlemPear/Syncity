import React from "react";
import { Field, reduxForm } from "redux-form";

//mui
import { Stack, Box, Button, TextField } from "@mui/material";

class LoginForm extends React.Component {
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

const validate = (values) => {
	const errors = {};
	const requiredFields = ["username", "password"];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = "Required";
		}
	});
	// if (
	// 	values.username &&
	// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.username)
	// ) {
	// 	errors.username = "Invalid email address";
	// }
	return errors;
};

export default reduxForm({
	form: "LoginForm",
	validate: validate,
})(LoginForm);
