import React from "react";
import { Link } from "react-router-dom";

//mui
import { Stack, Box, Typography, Button } from "@mui/material";

class UserAlreadyCreated extends React.Component {
	render() {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Stack spacing={2}>
					<Typography sx={{ display: "flex", justifyContent: "center" }} variant="h5">
						It looks like we already have an account with this email address.
					</Typography>
					<Button component={Link} to="/login">
						Log In
					</Button>
				</Stack>
			</Box>
		);
	}
}

export default UserAlreadyCreated;
