import React from "react";
import { Field, reduxForm } from "redux-form";

//mui
import { Button, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

class UserSearchForm extends React.Component {
	renderTextField = ({
		input,
		label,
		type,
		meta: { touched, error },
		...custom
	}) => {
		return (
			<>
				<TextField
					label={label}
					error={Boolean(touched && error)}
					helperText={error}
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
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Stack direction="row" spacing={1}>
						<Field
							name="email"
							component={this.renderTextField}
							type={"email"}
							label="Email Address"
						/>
						<Button type="submit" startIcon={<SearchIcon />}>
							Search
						</Button>
					</Stack>
				</form>
			</div>
		);
	}
}

const validateMui = (values) => {
	const errors = {};
	const requiredFields = ["email"];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = "Required";
		}
	});
	if (
		values.email &&
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
	) {
		errors.email = "Invalid email address";
	}
	return errors;
};

export default reduxForm({
	form: "UserSearchForm",
	validate: validateMui,
})(UserSearchForm);
