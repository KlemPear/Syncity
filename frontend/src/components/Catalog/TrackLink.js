import React, { Component } from "react";
import { connect } from "react-redux";
import MuiLink from "@mui/material/Link";
import { playTrack } from "../../actions";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import DownloadIcon from "@mui/icons-material/Download";
import { Stack, Typography } from "@mui/material";
import audioFiles from "../../apis/audioFiles";

class TrackLink extends Component {
	onPlayTrack = () => {
		this.props.playTrack(this.props.track);
	};

	onDownloadTrack = async () => {
		const { data } = await audioFiles.get("/", {
			params: {
				key: this.props.track.audioFile?.key,
			},
			responseType: "blob",
		});
		console.log(data);
		// file object
		const file = new Blob([data], {
			type: "audio/*",
		});

		// anchor link
		const element = document.createElement("a");
		element.href = URL.createObjectURL(file);
		element.download = this.props.track.audioFile.path;
		// simulate link click
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
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
