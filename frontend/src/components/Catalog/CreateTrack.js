import React from "react";
import { connect } from "react-redux";
import CreateTrackForm from "./CreateTrackForm";
import { createTrack } from "../../actions";

class CreateTrack extends React.Component {
	onSubmit = (formValues) => {
		this.props.createTrack({ ...formValues, author: `${this.props.userId}` });
	};
	render() {
		return (
			<div>
				<h3>Create Track</h3>
				<CreateTrackForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { createTrack })(CreateTrack);
