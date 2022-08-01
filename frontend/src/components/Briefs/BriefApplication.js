import React from "react";
import { connect } from "react-redux";
import { createApplication, addTokensToUser } from "../../actions";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import TrackSelector from "../Catalog/TrackSelector";
import CreateTrack from "../Catalog/CreateTrack";

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
			<div>You do not have enough tokens to do this. Consider buying more!</div>
		);
	}

	renderModalActions() {
		return (
			<React.Fragment>
				<Link to="/buy-tokens" className="ui button blue">
					Buy Tokens
				</Link>
			</React.Fragment>
		);
	}
	// TODO: Modify this so that it takes an array of tracks to submit
	onSubmit = () => {
		this.props.addTokensToUser(this.props.userId, -1);
		const applicationValues = {
			tracks: this.state.selectedTracks,
			author: `${this.props.userId}`,
			brief: `${this.props.briefId}`,
		};
		this.props.createApplication(applicationValues);
	};

	selectedTracks = (selectedTracks) => {
		this.setState({ selectedTracks: selectedTracks });
	};

	render() {
		return (
			<div>
				<h3>Submit an application</h3>
				<p>You can submit up to 3 tracks.</p>
				<p>Select tracks from your catalog: </p>
				<TrackSelector getSelectedTracks={this.selectedTracks} />
				<div>
					<button
						className="ui button"
						onClick={() => this.onAddNewTrackToggle()}
					>
						{!this.state.addNewTrackToCatalog
							? "Add a new track to your catalog"
							: "Hide new track form"}
					</button>
					{this.state.addNewTrackToCatalog ? (
						<CreateTrack pushToCatalog={false} />
					) : null}
				</div>
				{this.state.notEnoughTokens ? (
					<Modal
						title={"Not Enough Tokens"}
						content={this.renderModalContent()}
						actions={this.renderModalActions()}
						onDismiss={() => this.setState({ notEnoughTokens: false })}
					/>
				) : null}
				<div>
					<button
						className="ui button primary green"
						onClick={() => this.onSubmit()}
					>
						Submit
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { createApplication, addTokensToUser })(
	BriefApplication
);
