import React from "react";
import { Link } from "react-router-dom";

//mui
import { Stack, Box, Typography, Button } from "@mui/material";

const PaymentCanceled = (props) => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Stack spacing={2}>
				<Typography variant="h3">
					Uh Oh... Something went wrong with your payment.
				</Typography>
				<Typography>Don't worry, it was canceled.</Typography>
				<Button component={Link} to="/buy-tokens">
					Go back to subscription plans
				</Button>
			</Stack>
		</Box>
	);
};
export default PaymentCanceled;
