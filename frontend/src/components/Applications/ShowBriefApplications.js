import React from "react";
import { connect } from "react-redux";
import {
	fetchApplications,
	fetchBrief,
	createLicensingJob,
} from "../../actions";
import history from "../../util/history";
import ApplicationCard from "./ApplicationCard";
import Modal from "../Modal";

//mui
import { Stack, Box, Typography, List, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey } from "@mui/material/colors";

class ShowBriefApplications extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchApplicationsOnce: false,
			validateOnSubmit: false,
			selectedTrack: null,
		};
	}

	onValidateOnSubmit = (track) => {
		this.setState({ validateOnSubmit: !this.state.validateOnSubmit });
		this.setState({ selectedTrack: track });
	};

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

	renderOnValidateSubmitContent() {
		return (
			<>
				<Typography variant="body2">
					{`You will be taken to a Stripe payment page to deposit the brief budget amount. Then
				we will contact you directly at ${this.props.user.email} within 3 business days.`}
				</Typography>
				<Typography variant="body2">
					{`If we cannot get both parties signatures on the contract within 10 days, we will refund your deposit. `}
				</Typography>
			</>
		);
	}

	renderOnValidateSubmitActions() {
		return (
			<React.Fragment>
				<Button onClick={() => this.setState({ validateOnSubmit: false })}>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => this.createLicensingJob()}
				>
					Get me this track!
				</Button>
			</React.Fragment>
		);
	}

	createLicensingJob() {
		const licensingJob = {
			brief: this.props.brief,
			track: this.state.selectedTrack,
		};
		this.props.createLicensingJob(licensingJob);
		this.setState({ validateOnSubmit: false });
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
											onValidateOnSubmit={this.onValidateOnSubmit}
										/>
									))}
							</List>
						</Box>
					</Stack>
					{this.state.validateOnSubmit ? (
						<Modal
							showModal={this.state.validateOnSubmit}
							title={`Do you want to license the track "${this.state.selectedTrack.title} - ${this.state.selectedTrack.artist}?"`}
							content={this.renderOnValidateSubmitContent()}
							actions={this.renderOnValidateSubmitActions()}
							onDismiss={() => this.setState({ validateOnSubmit: false })}
						/>
					) : null}
				</>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth?.user?._id,
		user: state.auth?.user,
		applications: Object.values(state.applications),
		brief: state.briefs
			? state.briefs[history.location.pathname.split("/")[2]]
			: null,
	};
};

export default connect(mapStateToProps, {
	fetchApplications,
	fetchBrief,
	createLicensingJob,
})(ShowBriefApplications);
