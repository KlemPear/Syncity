import React from "react";
import { connect } from "react-redux";
import { fetchApplications } from "../../actions";
import BriefCard from "../Briefs/BriefCard";

class ListApplications extends React.Component {
	componentDidMount = () => {
		// fetch applications of the user
		this.props.fetchApplications({ author: this.props.userId });
	};

	render() {
		if (!this.props.applications || this.props.applications.length === 0) {
			return (
				<div>
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<h3>You have not submitted any applications yet.</h3>
				</div>
			);
		} else {
			return (
				<>
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<div className="ui cards">
						{this.props.applications.map((application) => (
							<BriefCard key={application._id} application={application} />
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
		applications: Object.values(state.applications),
	};
};

export default connect(mapStateToProps, { fetchApplications })(
	ListApplications
);
