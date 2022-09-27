import React, { useState, useEffect } from "react";

import {
	Box,
	Typography,
	Modal,
	Fade,
	Backdrop,
	Divider,
} from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const TransitionModal = (props) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		if (props.showModal) {
			handleOpen();
		} else {
			handleClose();
		}
	});

	return (
		<Box>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={props.onDismiss}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							{props.title}
						</Typography>
						<Box id="transition-modal-description" sx={{ mt: 2 }}>
							{props.content}
						</Box>
						<Divider sx={{ m: 1, bgcolor: "black" }} />
						<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							{props.actions}
						</Box>
					</Box>
				</Fade>
			</Modal>
		</Box>
	);
};

export default TransitionModal;
