import React from "react";

//mui
import { Box, Typography, Button, Stack } from "@mui/material";

const LandingPage = (props) => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Stack spacing={10}>
				<Typography variant="h1">Welcome to nost.audio</Typography>
				<Button color="primary" size="large">Sign In</Button>
			</Stack>
		</Box>
	);
};
export default LandingPage;
