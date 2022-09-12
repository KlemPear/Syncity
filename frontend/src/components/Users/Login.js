import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { loginUser } from "../../actions";
import { Link } from "react-router-dom";

//mui
import { Stack, Box, Typography, Button } from "@mui/material";

class Login extends React.Component {
	onSubmit = (formValues) => {
		this.props.loginUser(formValues);
	};

	renderUnauthorizedMessage = () => {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Typography>
					These user name and/or password are not recognized. Or you have not
					verified your email address yet. Please check your mailbox!
				</Typography>
			</Box>
		);
	};

	render() {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Stack spacing={2}>
					<Typography
						sx={{ display: "flex", justifyContent: "center" }}
						variant="h3"
					>
						Log In
					</Typography>
					{this.props.unauthorized ? this.renderUnauthorizedMessage() : null}
					<LoginForm onSubmit={this.onSubmit} />
					<Button component={Link} to="/forgot-password">
						Forgot Password?
					</Button>
				</Stack>
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		unauthorized: state.auth.unauthorized,
	};
};

export default connect(mapStateToProps, { loginUser })(Login);
