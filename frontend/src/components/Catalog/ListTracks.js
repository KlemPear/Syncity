import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { fetchTracks } from "../../actions";
import ShowTrack from "./ShowTrack";
import CreateTrack from "./CreateTrack";
import Modal from "../Modal";

//mui
import { Stack, Button, Box, Fab, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const pitchPlanToTrackMaxNumberDict = {
	freeTrial: 15,
	freePlan: 15,
	basicPitchPlan: 100,
	proPitchPlan: 500,
	businessPitchPlan: 1000,
};

class ListTracks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addNewTrackToCatalog: false,
			tooManyTracks: false,
		};
	}
	componentDidMount() {
		this.props.fetchTracks({ author: this.props.userId });
	}

	onAddNewTrackToggle = () => {
		if (
			this.props.tracks.length >=
			pitchPlanToTrackMaxNumberDict[this.props.user.pitchSubscriptionPlan]
		) {
			return this.setState({ tooManyTracks: !this.state.tooManyTracks });
		}
		this.setState({ addNewTrackToCatalog: !this.state.addNewTrackToCatalog });
	};

	renderTooManyTracksContent = () => {
		return (
			<>
				<Typography variant="body1">
					You have reached the maximum number of tracks you can upload with your
					current subscription plan.
				</Typography>
				<Typography variant="body1">
					You can either delete tracks that you do not use anymore, or upgrade
					your subscription plan.
				</Typography>
			</>
		);
	};

	renderTooManyTracksAction = () => {
		return (
			<Stack direction="row" spacing={1}>
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/buy-tokens"
				>
					Upgrade Plan
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={() =>
						this.setState({ tooManyTracks: !this.state.tooManyTracks })
					}
				>
					Cancel
				</Button>
			</Stack>
		);
	};

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
						// component={Link}
						// to="/create-track"
						color="secondary"
						aria-label="add"
						sx={{ m: 1, mb: 5 }}
						onClick={this.onAddNewTrackToggle}
					>
						<Add sx={{ mr: 1 }} />
						Add a track to your catalog
					</Fab>
					{this.props.tracks.length !== 0 ? (
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
								p: 3,
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
					) : null}
					<Box>
						{this.state.addNewTrackToCatalog ? (
							<Modal
								showModal={this.state.addNewTrackToCatalog}
								content={
									<CreateTrack
										pushToCatalog={false}
										onDismiss={this.onAddNewTrackToggle}
									/>
								}
								onDismiss={this.onAddNewTrackToggle}
							/>
						) : null}
						{this.state.tooManyTracks && (
							<Modal
								showModal={this.state.tooManyTracks}
								title={"Too many uploaded tracks"}
								content={this.renderTooManyTracksContent()}
								actions={this.renderTooManyTracksAction()}
								onDismiss={() =>
									this.setState({ tooManyTracks: !this.state.tooManyTracks })
								}
							/>
						)}
					</Box>
				</>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		user: state.auth.user,
		tracks: Object.values(state.tracks),
	};
};

export default connect(mapStateToProps, { fetchTracks })(ListTracks);
