import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { fetchTracks } from "../../actions";
import ShowTrack from "./ShowTrack";

class ListTracks extends React.Component {
	componentDidMount() {
		this.props.fetchTracks(this.props.userId);
	}

	render() {
		if (!this.props.tracks) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return (
				<>
					<div>
						<Link className="ui blue button" to={`/create-track`}>
							Add a track to your catalog
						</Link>
					</div>
					<div className="ui divided items">
						{this.props.tracks.map((track) => (
							<ShowTrack track={track} />
						))}
					</div>
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
