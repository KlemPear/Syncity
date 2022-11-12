import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import audioFiles from "../../apis/audioFiles";
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

function formatBytes(bytes, decimals = 2) {
	if (!+bytes) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function Dropzone(props) {
	const [fileUploadProgress, setfileUploadProgress] = React.useState(null);

	const onDrop = useCallback(
		async (files) => {
			const file = files[0];
			console.log("From Dropzone Component: ", file);

			const formData = new FormData();
			formData.append("file", file);

			const response = await audioFiles.post(`/upload`, formData, {
				onUploadProgress: (p) => {
					const percentCompleted = Math.round((p.loaded * 100) / p.total);
					console.log(`file ${percentCompleted}% uploaded`);
					setfileUploadProgress({ fileName: file.name, percentCompleted });
				},
			});
			props.onDrop(response.data.fileId);
		},
		[props]
	);

	const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
		acceptedFiles,
		fileRejections,
	} = useDropzone({
		accept: {
			"audio/mpeg": [],
			"audio/wav": [],
			// "audio/flac": [],
			// "audio/MPA": [],
		},
		maxFiles: 1,
		maxSize: 100000000, //100 MB
		onDrop: onDrop,
	});

	const style = useMemo(
		() => ({
			...{
				flex: 1,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "20px",
				borderWidth: 2,
				borderRadius: 2,
				borderColor: "#eeeeee",
				borderStyle: "dashed",
				backgroundColor: "#fafafa",
				color: "#bdbdbd",
				outline: "none",
				transition: "border .24s ease-in-out",
			},
			...(isFocused
				? {
						borderColor: "#2196f3",
				  }
				: {}),
			...(isDragAccept
				? {
						borderColor: "#00e676",
				  }
				: {}),
			...(isDragReject
				? {
						borderColor: "#ff1744",
				  }
				: {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	const acceptedFileItems = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {formatBytes(file.size)}
		</li>
	));

	const fileRejectionItems = fileRejections.map(({ file, errors }) => (
		<li key={file.path}>
			{file.path} - {formatBytes(file.size)}
			<ul>
				{errors.map((e) => (
					<li key={e.code}>{e.message}</li>
				))}
			</ul>
		</li>
	));

	return (
		<>
			<Box {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<Typography>
					Drag & drop your audio file here, or click to select a file
				</Typography>
				<em>(Only *.mp3 and *.wav files will be accepted)</em>
				<aside>
					{acceptedFileItems.length > 0 ? (
						<>
							<h4>Accepted file</h4>
							<ul>{acceptedFileItems}</ul>
						</>
					) : null}
					{fileRejectionItems.length > 0 ? (
						<>
							<h4>File Rejected</h4>
							<ul>{fileRejectionItems}</ul>
						</>
					) : null}
				</aside>
			</Box>
			{fileUploadProgress ? (
				<Box sx={{ width: "100%" }}>
					<Stack direction="row" spacing={1}>
						<Typography>{fileUploadProgress.fileName}</Typography>
						{fileUploadProgress.percentCompleted === 100 ? (
							<CheckCircleIcon color="success" />
						) : null}
					</Stack>
					<LinearProgressWithLabel
						value={fileUploadProgress.percentCompleted}
						color={
							fileUploadProgress.percentCompleted === 100
								? "success"
								: "secondary"
						}
					/>
				</Box>
			) : null}
		</>
	);
}

export default Dropzone;
