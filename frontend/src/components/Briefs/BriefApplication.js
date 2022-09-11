import React from "react";
import { connect } from "react-redux";
import { createApplication, burnPitchToken } from "../../actions";
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
			selectedTracks: [],
		};
	}
	onNotEnoughTokens = () => {
		this.setState({ notEnoughTokens: true });
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
				<Button component={Link} variant="contained" color="primary" to="/buy-tokens">
					Subscribe to a plan
				</Button>
			</React.Fragment>
		);
	}
	// TODO: Modify this so that it takes an array of tracks to submit
	onSubmit = () => {
		if (
			this.props.user.pitchTokens !== -1 &&
			this.props.user.pitchTokens - 1 < 0
		) {
			this.onNotEnoughTokens();
		} else {
			this.props.burnPitchToken(this.props.userId);
			const applicationValues = {
				tracks: this.state.selectedTracks,
				author: `${this.props.userId}`,
				brief: `${this.props.briefId}`,
			};
			this.props.createApplication(applicationValues);
		}
	};

	selectedTracks = (selectedTracks) => {
		this.setState({ selectedTracks: selectedTracks });
	};

	render() {
		return (
			<Stack spacing={2}>
				<Typography variant="h3">Submit an application</Typography>
				<Typography>You can submit up to 3 tracks.</Typography>
				<Stack direction="row" spacing={1} sx={{ m: 1 }}>
					<Typography>Select tracks from your catalog or </Typography>
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
						height: 400,
						overflow: "hidden",
						overflowY: "scroll",
					}}
				>
					<TrackSelector getSelectedTracks={this.selectedTracks} />
				</Box>
				<Typography>
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
				</Typography>
				{this.state.notEnoughTokens ? (
					<Modal
						showModal={this.state.notEnoughTokens}
						title={"Not Enough Tokens"}
						content={this.renderModalContent()}
						actions={this.renderModalActions()}
						onDismiss={() => this.setState({ notEnoughTokens: false })}
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
		userId: state.auth.user._id,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { createApplication, burnPitchToken })(
	BriefApplication
);
