import React, { Component } from "react";
import { connect } from "react-redux";
import { closeTrack } from "../../actions";
//mui
import { Box, AppBar, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player/lazy";
import Spotify from "react-spotify-embed";
import audioFiles from "../../apis/audioFiles";
import Loader from "../Loader";
import MuiPlayer from "../Player/MuiPlayer";

const wrapperStyle = {
	position: "relative",
};

const playerStyle = {
	position: "absolute",
	top: 0,
	left: 0,
	bgcolor: "blue",
};

class TrackPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = { url: null, songTitle: null };
	}

	onCloseTrack = () => {
		this.props.closeTrack();
	};

	componentDidMount = async () => {
		if (this.props.track.audioFile) {
			const url = await this.getAudioFileObjectUrl();
			this.setState({ url: url, songTitle: this.props.track.audioFile.path });
		} else {
			this.setState({ url: "none", songTitle: this.props.track.title });
		}
	};

	componentDidUpdate = async () => {
		if (
			this.state.songTitle &&
			this.props.track.audioFile?.path &&
			this.props.track.audioFile?.path !== this.state.songTitle
		) {
			const url = await this.getAudioFileObjectUrl();
			this.setState({ url: url, songTitle: this.props.track.audioFile.path });
		}
	};

	getAudioFileObjectUrl = async () => {
		const { data } = await audioFiles.get("/", {
			params: {
				key: this.props.track.audioFile?.key,
			},
			responseType: "blob",
		});
		// file object
		const file = new Blob([data], {
			type: "audio/*",
		});
		const url = URL.createObjectURL(file);
		return url;
	};

	renderPlayer = () => {
		const track = this.props.track;
		if (
			this.state.url !== "none" &&
			this.state.songTitle === track.audioFile?.path
		) {
			return (
				<>
					{/* <Typography variant="h6" sx={{ ml: 4, mt: 1 }}>
						{this.state.songTitle}
					</Typography>
					<div style={wrapperStyle}>
						<ReactPlayer
							url={this.state.url}
							controls={true}
							height={50}
							width="100%"
							playing={true}
							//style={playerStyle}
						/>
					</div> */}
					<MuiPlayer
						url={this.state.url}
						title={this.state.songTitle}
						playing={true}
					/>
				</>
			);
		}
		if (track.link?.includes("spotify")) {
			return (
				<>
					<Spotify link={track.link} height={80} width="auto" playing={true} />
				</>
			);
		}
		return (
			<ReactPlayer
				url={track.link}
				controls={true}
				height={80}
				width="auto"
				playing={true}
			/>
		);
	};

	render() {
		const track = this.props.track;
		if (Object.keys(track).length === 0) {
			return <></>;
		}
		if (this.state.url === null) {
			return (
				<>
					<Loader />
				</>
			);
		}
		return (
			<AppBar position="fixed" sx={{ bottom: 0, top: "auto" }} color="white">
				<Stack
					direction="row"
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						{this.renderPlayer()}
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							mx: 2,
						}}
					>
						<CloseIcon fontSize="large" onClick={this.onCloseTrack} />
					</Box>
				</Stack>
			</AppBar>
		);
	}
}

function mapStateToProps(state) {
	return {
		track: state.trackPlayer,
	};
}

export default connect(mapStateToProps, { closeTrack })(TrackPlayer);
