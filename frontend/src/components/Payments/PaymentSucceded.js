import React from "react";
import { Link } from "react-router-dom";

//mui
import { Stack, Box, Typography, Button } from "@mui/material";

const PaymentSucceded = (props) => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Stack spacing={2}>
				<Typography variant="h3">
					Thank you! Your payment was successful.
				</Typography>
				<Typography>
					You can see your updated token count on your profile page
				</Typography>
				<Button component={Link} to="/profile">
					Profile
				</Button>
			</Stack>
		</Box>
	);
};
export default PaymentSucceded;
