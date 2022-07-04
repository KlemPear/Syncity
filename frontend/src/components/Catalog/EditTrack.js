import React from "react";
import history from "../../util/history";
import { connect } from "react-redux";
import { editTrack, deleteTrack, fetchTrack } from "../../actions";
import { Link } from "react-router-dom";
import Loader from "../Loader";

import CreateTrackForm from "./CreateTrackForm";

class EditTrack extends React.Component {
	componentDidMount = () => {
		this.props.fetchTrack(history.location.pathname.split("/")[2]);
	};

	onSubmit = (formValues) => {
		this.props.editTrack({ ...formValues, author: `${this.props.userId}` });
	};

	onPressDelete = (id) => {
		this.props.deleteTrack(id);
	};

	render() {
		if (!this.props.track) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return (
				<div>
					<h3>this is a page to edit a Track or to delete it.</h3>
					<CreateTrackForm
						onSubmit={this.onSubmit}
						editTrack={this.props.track}
					/>
					<div
						className="ui basic red button"
						onClick={() => this.onPressDelete(this.props.track._id)}
					>
						Delete
					</div>
					<Link className="ui basic button" to={`/catalog`}>
						Cancel
					</Link>
				</div>
			);
		}
	}
}
const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		track: state.tracks
			? state.tracks[history.location.pathname.split("/")[2]]
			: null,
	};
};

export default connect(mapStateToProps, { editTrack, deleteTrack, fetchTrack })(
	EditTrack
);
