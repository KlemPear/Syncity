import React from "react";
import history from "../../util/history";
import { connect } from "react-redux";
import { editBrief, deleteBrief } from "../../actions";
import { Link } from "react-router-dom";

import CreateBriefForm from "./CreateBriefForm";

class EditBrief extends React.Component {
	onSubmit = (formValues) => {
		this.props.editBrief({ ...formValues, author: `${this.props.userId}` });
	};

	onPressDelete = (id) => {
		this.props.deleteBrief(id);
	};

	render() {
		return (
			<div>
				<h3>this is a page to edit a brief or to delete it.</h3>
				<CreateBriefForm
					onSubmit={this.onSubmit}
					editBrief={this.props.brief}
				/>
				<div
					className="ui basic red button"
					onClick={() => this.onPressDelete(this.props.brief._id)}
				>
					Delete
				</div>
				<Link className="ui basic button" to={`/list-briefs`}>
					Cancel
				</Link>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		brief: state.briefs[history.location.pathname.split("/")[3]],
	};
};

export default connect(mapStateToProps, { editBrief, deleteBrief })(EditBrief);
