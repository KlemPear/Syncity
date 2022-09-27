import React, { Component } from "react";
import { connect } from "react-redux";
import { closeTrack } from "../../actions";
//mui
import { Box, AppBar, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player/lazy";
import Spotify from "react-spotify-embed";

class TrackPlayer extends Component {
	onCloseTrack = () => {
		this.props.closeTrack();
	};

	render() {
		const track = this.props.track;
		if (Object.keys(track).length === 0) {
			return <></>;
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
						{track.link.includes("spotify") ? (
							<Spotify link={track.link} height={80} width="auto" />
						) : (
							<ReactPlayer
								url={track.link}
								controls={true}
								height={80}
								width="auto"
							/>
						)}
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
