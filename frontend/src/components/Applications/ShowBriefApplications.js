import React from "react";
import { connect } from "react-redux";
import { fetchApplications, fetchBrief } from "../../actions";
import history from "../../util/history";
import ApplicationCard from "./ApplicationCard";

//mui
import { Stack, Box, Typography, List } from "@mui/material";

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
		if (!this.props.applications || this.props.applications.length === 0) {
			return (
				<Box justifyContent="center" alignItems="center" sx={{ mt: 20 }}>
					<Typography
						variant="h3"
						sx={{ display: "flex", justifyContent: "center" }}
					>
						No applications were submitted for this brief so far...
					</Typography>
				</Box>
			);
		} else {
			return (
				<>
					<Stack spacing={2}>
						<Typography variant="h3">{`${this.props.brief.title}`}</Typography>
						<Typography variant="p">
							If you like an application you will be able to see its contact
							information, and the applicant will be notified.
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								height: 550,
								overflow: "hidden",
								overflowY: "auto",
							}}
						>
							<List sx={{ m: 3 }}>
								{this.props.applications.map((application) => (
									<ApplicationCard
										key={application._id}
										application={application}
									/>
								))}
							</List>
						</Box>
					</Stack>
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
