import React from "react";
import history from "../../util/history";
import { connect } from "react-redux";
import { editBrief, deleteBrief, fetchBrief } from "../../actions";
import Loader from "../Loader";

import CreateBriefForm from "./CreateBriefForm";

//mui
import { Typography, Stack } from "@mui/material";

class EditBrief extends React.Component {
	componentDidMount = () => {
		this.props.fetchBrief(history.location.pathname.split("/")[3]);
	};

	onSubmit = (formValues) => {
		this.props.editBrief({ ...formValues, author: `${this.props.userId}` });
	};

	onPressDelete = (id) => {
		this.props.deleteBrief(id);
	};

	render() {
		if (!this.props.brief) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return (
				<Stack spacing={2} sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column"}}>
					<Typography variant="h3">Edit Brief</Typography>
					<CreateBriefForm
						onSubmit={this.onSubmit}
						editBrief={this.props.brief}
						onDelete={() => this.onPressDelete(this.props.brief._id)}
					/>
				</Stack>
			);
		}
	}
}
const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		brief: state.briefs
			? state.briefs[history.location.pathname.split("/")[3]]
			: null,
	};
};

export default connect(mapStateToProps, { editBrief, deleteBrief, fetchBrief })(
	EditBrief
);
