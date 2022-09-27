import React from "react";
import { connect } from "react-redux";
import CreateTrackForm from "./CreateTrackForm";
import { createTrack } from "../../actions";

//mui
import { Typography, Box } from "@mui/material";


class CreateTrack extends React.Component {
	onSubmit = (formValues) => {
		if (this.props.pushToCatalog == null) {
			this.props.createTrack(
				{ ...formValues, author: `${this.props.userId}` },
				true
			);
		} else {
			this.props.createTrack(
				{ ...formValues, author: `${this.props.userId}` },
				this.props.pushToCatalog
			);
			this.props.onDismiss();
		}
	};

	render() {
		return (
			<Box sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column"}}>
				<Typography sx={{m:2}} variant="h3">Add Track</Typography>
				<CreateTrackForm onSubmit={this.onSubmit} onCancel={this.props.onDismiss} />
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { createTrack })(CreateTrack);
