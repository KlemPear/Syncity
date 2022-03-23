import React from "react";
import { connect } from "react-redux";
import CreateBriefForm from "./CreateBriefForm";
import { createBrief } from "../../actions";

class CreateBrief extends React.Component {
	onSubmit = (formValues) => {
		this.props.createBrief({ ...formValues, author: `${this.props.userId}` });
	};

	render() {
		return (
			<div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<h3>Create New Brief</h3>
				<CreateBriefForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { createBrief })(CreateBrief);
