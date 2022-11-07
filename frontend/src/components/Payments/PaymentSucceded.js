import React from "react";
import { Link } from "react-router-dom";

//mui
import { Stack, Box, Typography, Button } from "@mui/material";

const PaymentSucceded = (props) => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
			<Stack spacing={2}>
				<Typography variant="h3">
					Your payment was successful.
				</Typography>
				<Typography variant="body1">Thank you for your business.</Typography>
				<Button component={Link} to="/profile">
					Profile
				</Button>
			</Stack>
		</Box>
	);
};
export default PaymentSucceded;
