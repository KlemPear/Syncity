import React, { Component } from "react";
import { connect } from "react-redux";
import MuiLink from "@mui/material/Link";
import { playTrack } from "../../actions";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import DownloadIcon from "@mui/icons-material/Download";
import { Stack, Typography } from "@mui/material";
import audioFiles from "../../apis/audioFiles";
import fileDownload from "js-file-download";
import FileUploadProgress from "../Inputs/FileUploadProgress";

class TrackLink extends Component {
	constructor(props) {
		super(props);
		this.state = { fileUploadProgress: null };
	}

	onPlayTrack = () => {
		this.props.playTrack(this.props.track);
	};

	onDownloadTrack = async () => {
		audioFiles
			.get("/", {
				params: {
					key: this.props.track.audioFile?.key,
				},
				responseType: "blob",
				onDownloadProgress: (progressEvent) => {
					let percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					this.setState({
						fileUploadProgress: {
							fileName: this.props.track.audioFile?.path,
							percentCompleted,
							stillLoading: true,
						},
					});
				},
			})
			.then((res) => {
				this.setState({
					fileUploadProgress: {
						fileName: this.props.track.audioFile?.path,
						percentCompleted: 100,
						stillLoading: false,
					},
				});
				fileDownload(res.data, this.props.track.audioFile?.path);
			});
	};

	render() {
		const track = this.props.track;
		if (track.audioFile) {
			return (
				<>
					<Stack direction="row" spacing={1}>
						<Typography variant="h6" rel="noopener noreferrer">
							{track.title} - {track.artist}
						</Typography>
						<DownloadIcon
							onClick={this.onDownloadTrack}
							color="primary"
							fontSize="large"
						/>
						<HeadphonesIcon
							onClick={this.onPlayTrack}
							color="primary"
							fontSize="large"
						/>
						{this.state.fileUploadProgress ? (
							<FileUploadProgress
								fileUploadProgress={this.state.fileUploadProgress}
							/>
						) : null}
					</Stack>
				</>
			);
		}
		if (
			track.link.includes("spotify") ||
			track.link.includes("youtube") ||
			track.link.includes("soundcloud")
		) {
			return (
				<>
					<Stack direction="row" spacing={1}>
						<MuiLink
							variant="h6"
							component="a"
							href={track.link}
							target="_blank"
							underline="hover"
							rel="noopener noreferrer"
						>
							{track.title} - {track.artist}
						</MuiLink>
						<HeadphonesIcon
							onClick={this.onPlayTrack}
							color="primary"
							fontSize="large"
						/>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<MuiLink
						variant="h6"
						component="a"
						href={track.link}
						underline="hover"
						target="_blank"
						rel="noopener noreferrer"
					>
						{track.title} - {track.artist}
					</MuiLink>
				</>
			);
		}
	}
}

export default connect(null, { playTrack })(TrackLink);
