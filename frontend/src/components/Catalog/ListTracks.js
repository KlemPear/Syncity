import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { fetchTracks } from "../../actions";
import ShowTrack from "./ShowTrack";

//mui
import { Stack, Button, Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

class ListTracks extends React.Component {
	componentDidMount() {
		this.props.fetchTracks({ author: this.props.userId });
	}

	renderTrackEditButton = (track) => {
		return (
			<Button
				variant="contained"
				component={Link}
				to={`/catalog/${track._id}`}
				color="secondary"
			>
				Edit
			</Button>
		);
	};

	render() {
		if (!this.props.tracks) {
			return (
				<Box>
					<Loader />
				</Box>
			);
		} else {
			return (
				<>
					<Fab
						variant="extended"
						component={Link}
						to="/create-track"
						color="secondary"
						aria-label="add"
						sx={{ m: 1, mb:5 }}
					>
						<Add sx={{ mr: 1 }} />
						Add a track to your catalog
					</Fab>
					<Stack
						spacing={2}
						sx={{
							display: "flex",
							flexDirection: "column",
							maxHeight: 550,
							overflow: "hidden",
							overflowY: "auto",
							border: 1, 
							borderRadius: "16px",
							p: 3
						}}
					>
						{this.props.tracks.map((track) => (
							<Box key={track._id}>
								<ShowTrack
									track={track}
									button={this.renderTrackEditButton(track)}
								/>
							</Box>
						))}
					</Stack>
				</>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		tracks: Object.values(state.tracks),
	};
};

export default connect(mapStateToProps, { fetchTracks })(ListTracks);
