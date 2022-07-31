import React from "react";
import { connect } from "react-redux";
import { fetchTracks } from "../../actions";

class TrackSelector extends React.Component {
	componentDidMount = () => {
		this.props.fetchTracks({ user: this.props.userId });
	};

	render() {
		console.log(this.props.tracks);
		if (!this.props.tracks) {
			return (
				<div>
					<p>We cannot find any track in your catalog.</p>
				</div>
			);
		}
		return (
			<div>
				{this.props.tracks.map((track) => {
					<div key={track._id}>{track.title}</div>;
				})}
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
