import React from "react";
import { connect } from "react-redux";
import { fetchApplications, fetchBrief } from "../../actions";
import history from "../../util/history";
import ApplicationCard from "./ApplicationCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey } from "@mui/material/colors";
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
							If you like a track, you can pre-select it by clicking on{" "}
							<FavoriteIcon sx={{ color: grey[600] }} />.
						</Typography>
						<Typography variant="p">
							Once tracks are pre-selected, you can start the licensing process
							directly on NOST! You will be taken to a Stripe payment page, and
							we will start taking care of the contracts.
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
								{this.props.applications
									.sort(
										(a, b) => -(a.likedTracks?.length - b.likedTracks?.length)
									)
									.map((application) => (
										<ApplicationCard
											key={application._id}
											applicationId={application._id}
											brief={this.props.brief}
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
		userId: state.auth?.user?._id,
		applications: Object.values(state.applications),
		brief: state.briefs
			? state.briefs[history.location.pathname.split("/")[2]]
			: null,
	};
};

export default connect(mapStateToProps, { fetchApplications, fetchBrief })(
	ShowBriefApplications
);
