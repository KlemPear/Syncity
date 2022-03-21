import React from "react";
import { connect } from "react-redux";
import { fetchApplications, fetchBrief } from "../../actions";
import history from "../../util/history";
import Loader from "../Loader";
import ApplicationCard from "./ApplicationCard";

class ShowBriefApplications extends React.Component {
	constructor(props) {
		super(props);
		this.state = { fetchApplicationsOnce: false };
	}
	componentDidMount() {
		this.props.fetchBrief(history.location.pathname.split("/")[2]);
		if (this.props.brief) {
			this.props.fetchApplications({ brief: this.props.brief._id });
		}
	}

	componentDidUpdate() {
		if (this.props.brief && !this.state.fetchApplicationsOnce) {
			this.props.fetchApplications({ brief: this.props.brief._id });
			this.setState({ fetchApplicationsOnce: true });
		}
	}

	render() {
		if (!this.props.applications) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return (
				<>
					<div className="ui cards">
						{this.props.applications.map((application) => (
							<ApplicationCard
								key={application._id}
								application={application}
							/>
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
		brief: state.briefs
			? state.briefs[history.location.pathname.split("/")[2]]
			: null,
	};
};

export default connect(mapStateToProps, { fetchApplications, fetchBrief })(
	ShowBriefApplications
);
