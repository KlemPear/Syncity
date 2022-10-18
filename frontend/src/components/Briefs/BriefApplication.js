import React from "react";
import { connect } from "react-redux";
import {
	createApplication,
	burnPitchToken,
	createNotification,
} from "../../actions";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import TrackSelector from "../Catalog/TrackSelector";
import CreateTrack from "../Catalog/CreateTrack";
//mui
import { Box, Button, Typography, Stack } from "@mui/material";

class BriefApplication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notEnoughTokens: false,
			addNewTrackToCatalog: false,
			noTrackSelected: false,
			selectedTracks: [],
		};
	}
	onNotEnoughTokens = () => {
		this.setState({ notEnoughTokens: true });
	};

	onNoTrackSelected = () => {
		this.setState({ noTrackSelected: true });
	};

	onAddNewTrackToggle = () => {
		this.setState({ addNewTrackToCatalog: !this.state.addNewTrackToCatalog });
	};

	renderModalContent() {
		return (
			<div>
				You do not have enough application tokens to do this. Consider
				subscribing to a different plan!
			</div>
		);
	}

	renderModalActions() {
		return (
			<React.Fragment>
				<Button
					component={Link}
					variant="contained"
					color="primary"
					to="/buy-tokens"
				>
					Subscribe to a plan
				</Button>
			</React.Fragment>
		);
	}

	renderNoTrackModalContent() {
		return (
			<Typography variant="body2">
				You did not select any track in your application. Select up to 3 tracks
				from your catalog, or add a new track to your catalog.
			</Typography>
		);
	}

	renderNoTrackModalActions() {
		return (
			<React.Fragment>
				<Button onClick={() => this.onAddNewTrackToggle()}>
					Add a new track to your catalog
				</Button>
			</React.Fragment>
		);
	}

	onSubmit = () => {
		if (
			this.props.user.pitchTokens !== -1 &&
			this.props.user.pitchTokens - 1 < 0
		) {
			this.onNotEnoughTokens();
		}
		if (this.state.selectedTracks.length === 0) {
			this.onNoTrackSelected();
		} else {
			this.props.burnPitchToken(this.props.userId);
			const applicationValues = {
				tracks: this.state.selectedTracks,
				author: `${this.props.userId}`,
				brief: `${this.props.brief._id}`,
			};
			this.props.createApplication(applicationValues);
			// Notify brief author of the application
			const notif = {
				title: "You've got a new application!",
				description: `${this.props.brief.title} got a new application.`,
				date: Date.now(),
				link: `/show-brief/${this.props.brief._id}/applications`,
				user: this.props.brief.author,
			};
			this.createNotification(notif);
		}
	};

	selectedTracks = (selectedTracks) => {
		this.setState({ selectedTracks: selectedTracks });
	};

	render() {
		if (!this.props.user) {
			return (
				<Stack spacing={2} sx={{ m: 2 }}>
					<Typography variant="h4" align="center">
						Create an account or login to submit your own application.
					</Typography>
					<Button component={Link} to="/register">
						Sign Up
					</Button>
					<Button component={Link} to="/login">
						Log In
					</Button>
				</Stack>
			);
		}
		return (
			<Stack spacing={2} sx={{ m: 2 }}>
				<Typography variant="h3">Submit an application</Typography>
				<Typography>You can submit up to 3 tracks.</Typography>
				<Stack direction="row" spacing={1} sx={{ m: 1 }}>
					<Typography>Select tracks from your catalog</Typography>
					<Typography>or</Typography>
					<Button sx={{ p: 0 }} onClick={() => this.onAddNewTrackToggle()}>
						{!this.state.addNewTrackToCatalog
							? "Add a new track to your catalog"
							: "Hide new track form"}
					</Button>
				</Stack>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						maxHeight: 400,
						overflow: "hidden",
						overflowY: "auto",
					}}
				>
					<TrackSelector getSelectedTracks={this.selectedTracks} />
				</Box>
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
				</Box>
				{this.state.notEnoughTokens ? (
					<Modal
						showModal={this.state.notEnoughTokens}
						title={"Not Enough Tokens"}
						content={this.renderModalContent()}
						actions={this.renderModalActions()}
						onDismiss={() => this.setState({ notEnoughTokens: false })}
					/>
				) : null}
				{this.state.noTrackSelected ? (
					<Modal
						showModal={this.state.noTrackSelected}
						title={"No Track Selected"}
						content={this.renderNoTrackModalContent()}
						actions={this.renderNoTrackModalActions()}
						onDismiss={() => this.setState({ noTrackSelected: false })}
					/>
				) : null}
				<Box>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => this.onSubmit()}
					>
						Submit
					</Button>
				</Box>
			</Stack>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth?.user?._id,
		user: state.auth?.user,
	};
};

export default connect(mapStateToProps, {
	createApplication,
	burnPitchToken,
	createNotification,
})(BriefApplication);
