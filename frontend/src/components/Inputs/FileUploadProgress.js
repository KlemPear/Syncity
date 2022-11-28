import React, { Component } from "react";
//mui
import { Box, Typography, Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

class FileUploadProgress extends Component {
	render() {
		const { fileUploadProgress } = this.props;
		return (
			<Box sx={{ width: "100%" }}>
				<Stack direction="row" spacing={1}>
					<Typography>{fileUploadProgress.fileName}</Typography>
					{fileUploadProgress.stillLoading === false ? (
						<CheckCircleIcon color="success" />
					) : null}
				</Stack>
				<LinearProgressWithLabel
					value={fileUploadProgress.percentCompleted}
					color={
						fileUploadProgress.stillLoading === false ? "success" : "secondary"
					}
				/>
			</Box>
		);
	}
}

export default FileUploadProgress;
