import React from "react";
import { connect } from "react-redux";
import { fetchTracks } from "../../actions";
import Modal from "../Modal";
import TrackLink from "./TrackLink";

//mui
import {
	Checkbox,
	Box,
	List,
	ListItem,
	ListItemText,
	Avatar,
	ListItemAvatar,
	Typography,
} from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import MuiLink from "@mui/material/Link";

class TrackSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedTracks: [], tooManyTracksSelected: false };
	}

	componentDidMount = () => {
		this.props.fetchTracks({ author: this.props.userId });
	};

	componentDidUpdate = () => {
		this.relaySelectedTracks();
	};

	handleCheckboxToggle = (track) => {
		if (!this.state.selectedTracks.includes(track._id)) {
			if (this.state.selectedTracks.length >= 3) {
				this.setState({ tooManyTracksSelected: true });
			}
			this.setState({
				selectedTracks: [...this.state.selectedTracks, track._id],
			});
		} else {
			if (this.state.selectedTracks.length === 1) {
				this.setState({
					selectedTracks: [],
				});
			} else {
				this.setState({
					selectedTracks: this.state.selectedTracks.filter(
						(item) => item !== track._id
					),
				});
			}
		}
	};

	renderTrackButton = (track) => {
		return (
			<>
				<Checkbox
					type="checkbox"
					name={track._id}
					onChange={() => this.handleCheckboxToggle(track)}
				/>
			</>
		);
	};

	renderModalContent() {
		return <div>You cannot select more than 3 tracks.</div>;
	}

	renderModalDismiss() {
		this.setState({ tooManyTracksSelected: false });
		window.location.reload(false);
	}

	relaySelectedTracks = () => {
		this.props.getSelectedTracks(this.state.selectedTracks);
	};

	render() {
		if (!this.props.tracks) {
			return (
				<div>
					<p>We cannot find any track in your catalog.</p>
				</div>
			);
		}
		return (
			<Box>
				<List dense={true}>
					{this.props.tracks.map((track) => (
						<ListItem
							key={track._id}
							secondaryAction={this.renderTrackButton(track)}
						>
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: "#458FF7" }}>
									<AudiotrackIcon color="primary" />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={
									<TrackLink track={track} />
								}
								secondary={
									<Typography variant="body2">
										Master: {track.masterContact} - Publisher:{" "}
										{track.publisherContact}
									</Typography>
								}
							/>
						</ListItem>
					))}
				</List>
				{this.state.tooManyTracksSelected ? (
					<Modal
						showModal={this.state.tooManyTracksSelected}
						title={"You can only select 3 tracks maximum."}
						content={this.renderModalContent()}
						onDismiss={() => this.renderModalDismiss()}
					/>
				) : null}
			</Box>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userId: state.auth.user._id,
		tracks: Object.values(state.tracks),
	};
};

export default connect(mapStateToProps, { fetchTracks })(TrackSelector);
