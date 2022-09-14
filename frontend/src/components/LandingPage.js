import React from "react";
import { Link } from "react-router-dom";

//mui
import { Box, Typography, Button, Stack } from "@mui/material";

const LandingPage = (props) => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Stack spacing={10}>
				<Typography variant="h1">Welcome to nost.audio</Typography>
				<Button component={Link} to="/login" color="primary" size="large">Sign In</Button>
			</Stack>
		</Box>
	);
};
export default LandingPage;
