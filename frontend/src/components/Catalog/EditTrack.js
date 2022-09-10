import React from "react";
import history from "../../util/history";
import { connect } from "react-redux";
import { editTrack, deleteTrack, fetchTrack } from "../../actions";
import Loader from "../Loader";

import CreateTrackForm from "./CreateTrackForm";

//mui
import { Typography, Box } from "@mui/material";

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
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-evenly",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Typography sx={{ m: 2 }} variant="h3">
						Edit Track
					</Typography>
					<CreateTrackForm
						onSubmit={this.onSubmit}
						editTrack={this.props.track}
						onDelete={() => this.onPressDelete(this.props.track._id)}
					/>
				</Box>
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
