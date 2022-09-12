import React from "react";
import { connect } from "react-redux";
import RegisterForm from "./RegisterForm";
import { registerUser } from "../../actions";

//mui
import { Stack, Box, Typography } from "@mui/material";

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
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Stack spacing={2}>
					<Typography
						sx={{ display: "flex", justifyContent: "center" }}
						variant="h3"
					>
						Register
					</Typography>
					<RegisterForm onSubmit={this.onSubmit} />
				</Stack>
			</Box>
		);
	}
}

export default connect(null, { registerUser })(Register);
