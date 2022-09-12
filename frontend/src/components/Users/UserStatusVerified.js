import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { verifyUser } from "../../actions";

//mui
import { Stack, Box, Typography, Button } from "@mui/material";

class UserStatusVerified extends React.Component {
	componentDidMount = () => {
		this.props.verifyUser(this.props.match.params.confirmationCode);
	};

	render() {
		if (this.props.isUserPending) {
			return (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<Typography variant="h3">
						Sorry, we could not verify this email.
					</Typography>
				</Box>
			);
		}
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Stack spacing={2}>
					<Typography variant="h3">
						Thank you for verifying your email address!
					</Typography>
					<Button component={Link} to="/list-briefs">
						Welcome to Nost!
					</Button>
				</Stack>
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		unauthorized: state.auth.unauthorized,
		isUserPending: state.auth.user?.status === "Pending",
	};
};

export default connect(mapStateToProps, { verifyUser })(UserStatusVerified);
