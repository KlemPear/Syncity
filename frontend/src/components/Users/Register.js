import React from "react";
import { connect } from "react-redux";
import RegisterForm from "./RegisterForm";
import { registerUser } from "../../actions";

//mui
import { Stack, Box, Typography, Divider } from "@mui/material";

class Register extends React.Component {
	onSubmit = (formValues) => {
		const user = {
			firstName: formValues.firstName,
			lastName: formValues.lastName,
			sponsorCode: formValues.sponsorCode,
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
			<Box sx={{ display: "flex", justifyContent: "space-around" }}>
				<Stack
					direction="row"
					divider={<Divider orientation="vertical" flexItem />}
					justifyContent="space-evenly"
					alignItems="center"
					spacing={2}
				>
					<Stack>
						<img
							style={{
								width: 200,
								height: 200,
							}}
							src={process.env.PUBLIC_URL + "/NOST_CHOICE-Favicon.png"}
							alt="logo"
						/>
						<Typography
							sx={{ display: "flex", justifyContent: "center" }}
							variant="h3"
						>
							Sign Up
						</Typography>
					</Stack>
					<RegisterForm onSubmit={this.onSubmit} />
				</Stack>
			</Box>
		);
	}
}

export default connect(null, { registerUser })(Register);
