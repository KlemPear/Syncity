import React from "react";

//mui
import { Stack, Box, Typography } from "@mui/material";

const UserStatusPending = () => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Stack spacing={2}>
				<Typography variant="h3">Thank you for Registering!</Typography>
				<Typography>
					Please confirm your email address to access NOST.
				</Typography>
			</Stack>
		</Box>
	);
};

export default UserStatusPending;
