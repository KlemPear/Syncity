import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Stack, Button, Typography } from "@mui/material";

function mapStateToProps(state) {
	return {
		user: state.auth.user,
	};
}

class BriefSubmitted extends Component {
	render() {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
				<Stack spacing={5}>
					<Typography variant="h4">
						Your brief was submitted successfully!
					</Typography>
					<Button
						component={Link}
						variant="contained"
						color="primary"
						to="/list-briefs"
						size="large"
					>
						Go Back to Briefs
					</Button>
				</Stack>
			</Box>
		);
	}
}

export default connect(mapStateToProps)(BriefSubmitted);
