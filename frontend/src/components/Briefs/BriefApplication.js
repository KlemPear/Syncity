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

const pitchPlanToCommisionDict = {
	freeTrial: 30,
	freePlan: 30,
	basicPitchPlan: 20,
	proPitchPlan: 15,
	businessPitchPlan: 10,
};

class BriefApplication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notEnoughTokens: false,
			addNewTrackToCatalog: false,
			noTrackSelected: false,
			validateOnSubmit: false,
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

	onValidateOnSubmit = () => {
		this.setState({ validateOnSubmit: !this.state.validateOnSubmit });
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

	renderOnValidateSubmitContent() {
		return (
			<Typography variant="body2">
				{`Upon submission of your application, you accept that nost will perceive
				a commission of ${
					pitchPlanToCommisionDict[this.props.user.pitchSubscriptionPlan]
				}% on this brief budget. `}
				{pitchPlanToCommisionDict[this.props.user.pitchSubscriptionPlan] === 10
					? "You are on the Business Application Plan, you are getting the best commission rate possible!"
					: `Upgrade your account before
				submitting your selection to change your commission rate.`}
			</Typography>
		);
	}

	renderOnValidateSubmitActions() {
		return (
			<React.Fragment>
				<Button onClick={() => this.setState({ validateOnSubmit: false })}>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => this.createApplicationAndNotification()}
				>
					I agree. Submit!
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
			this.onValidateOnSubmit();
		}
	};

	createApplicationAndNotification() {
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
		this.props.createNotification(notif);
	}

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
				{this.state.validateOnSubmit ? (
					<Modal
						showModal={this.state.validateOnSubmit}
						title={"Please confirm your submission"}
						content={this.renderOnValidateSubmitContent()}
						actions={this.renderOnValidateSubmitActions()}
						onDismiss={() => this.setState({ validateOnSubmit: false })}
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
