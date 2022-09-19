import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Stack, Button, Typography } from "@mui/material";

function mapStateToProps(state) {
	return {
		user: state.auth.user,
	};
}

class ApplicationSubmitted extends Component {
	render() {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
				<Stack spacing={5}>
					<Typography variant="h4">
						Your application was submitted successfully!
					</Typography>
					<Typography>
						You have{" "}
						{this.props.user.pitchTokens === -1
							? "unlimited"
							: this.props.user.pitchTokens}{" "}
						applications left to submit during this billing period.
					</Typography>
					<Button
						component={Link}
						variant="contained"
						color="primary"
						to="/list-applications"
						size="large"
					>
						Go Back to My Applications
					</Button>
				</Stack>
			</Box>
		);
	}
}

export default connect(mapStateToProps)(ApplicationSubmitted);
