import React from "react";
import { connect } from "react-redux";
import BriefApplicationForm from "./BriefApplicationForm";
import { createApplication } from "../../actions";

class BriefApplication extends React.Component {
	onSubmit = (formValues) => {
		this.props.createApplication({
			...formValues,
			author: `${this.props.userId}`,
			brief: `${this.props.briefId}`,
		});
	};

	render() {
		return (
			<div>
				<h3>Submit an application</h3>
				<BriefApplicationForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { createApplication })(BriefApplication);
