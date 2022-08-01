import React from "react";
import { connect } from "react-redux";
import { fetchTracks } from "../../actions";
import ShowTrack from "./ShowTrack";
import Modal from "../Modal";

class TrackSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedTracks: [], tooManyTracksSelected: false };
	}

	componentDidMount = () => {
		this.props.fetchTracks({ user: this.props.userId });
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
			<div className="ui checkbox">
				<input
					type="checkbox"
					name={track._id}
					onChange={() => this.handleCheckboxToggle(track)}
				/>
				<label></label>
			</div>
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
			<div>
				{this.props.tracks.map((track) => (
					<div key={track._id} className="item">
						<ShowTrack track={track} button={this.renderTrackButton(track)} />
					</div>
				))}
				{this.state.tooManyTracksSelected ? (
					<Modal
						title={"You can only select 3 track maximum."}
						content={this.renderModalContent()}
						onDismiss={() => this.renderModalDismiss()}
					/>
				) : null}
			</div>
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
