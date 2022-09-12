import React from "react";
import { connect } from "react-redux";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { userForgotPassword } from "../../actions";

//mui
import { Stack, Box, Typography, Button } from "@mui/material";

class ForgotPassword extends React.Component {
	onSubmit = (formValues) => {
		this.props.userForgotPassword(formValues);
	};

	renderResults() {
		if (this.props.userNotFound) {
			return (
				<Box>
					<Typography>
						Sorry, this email does not correspond to any existing account.
					</Typography>
				</Box>
			);
		}
		if (this.props.user) {
			return (
				<Box>
					<Typography>
						We sent an email to your address. Check your mailbox!
					</Typography>
				</Box>
			);
		}
		return null;
	}

	render() {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Stack spacing={2}>
					<Typography
						sx={{ display: "flex", justifyContent: "center" }}
						variant="h4"
					>
						Forgot Password
					</Typography>
					<Typography>
						Submit your email address, if it matches one of our accounts we will
						send you an email to reset your password.
					</Typography>
					<ForgotPasswordForm onSubmit={this.onSubmit} />
					{this.renderResults()}
				</Stack>
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userNotFound: state.auth.userNotFound,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { userForgotPassword })(ForgotPassword);
