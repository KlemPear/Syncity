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

	renderTrackEditButton = (track) => {
		return (
			<Link to={`/catalog/${track._id}`} className="ui right floated button">
				Edit
			</Link>
		);
	};

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
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<Link className="ui blue button" to={`/create-track`}>
							Add a track to your catalog
						</Link>
					</div>
					<div className="ui divided items">
						{this.props.tracks.map((track) => (
							<div key={track._id} className="item">
								<ShowTrack
									track={track}
									button={this.renderTrackEditButton(track)}
								/>
							</div>
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
