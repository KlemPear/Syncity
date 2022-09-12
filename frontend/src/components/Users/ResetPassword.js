import React from "react";
import { connect } from "react-redux";
import ResetPasswordForm from "./ResetPasswordForm";
import { getUserByConfirmationCode, updateUserPassword } from "../../actions";

//mui
import { Stack, Box, Typography } from "@mui/material";

class ResetPassword extends React.Component {
	componentDidMount = () => {
		this.props.getUserByConfirmationCode(
			this.props.match.params.confirmationCode
		);
	};

	onSubmit = (formValues) => {
		this.props.updateUserPassword(this.props.user.confirmationCode, formValues);
	};

	render() {
		if (!this.props.user) {
			return (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<Typography variant="h3">
						Sorry, we cannot find an account linked to this email.
					</Typography>
				</Box>
			);
		}
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Stack spacing={2}>
					<Typography
						sx={{ display: "flex", justifyContent: "center" }}
						variant="h3"
					>
						Reset your password
					</Typography>
					<ResetPasswordForm onSubmit={this.onSubmit} />
				</Stack>
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth?.user,
	};
};

export default connect(mapStateToProps, {
	getUserByConfirmationCode,
	updateUserPassword,
})(ResetPassword);
