import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TrackLink from "../Catalog/TrackLink";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";
import { editLicensingJob, likeApplication } from "../../actions";
//mui
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	Box,
	Typography,
	Stack,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

function mapStateToProps(state) {
	return {};
}

const pitchPlanToCommisionDict = {
	freeTrial: 30,
	freePlan: 30,
	basicPitchPlan: 25,
	proPitchPlan: 18,
	businessPitchPlan: 10,
};

class LicensingJobCard extends Component {
	renderBriefInfo = (brief) => {
		return (
			<List>
				<ListItem>
					<MuiLink
						variant="h6"
						underline="hover"
						component={Link}
						to={`show-brief/${brief._id}`}
					>
						Brief: {brief.title}
					</MuiLink>
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`Submitted by ${brief.author.firstName} ${brief.author.lastName} - ${brief.author.email}`}</Typography>
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`Sponsor Code: ${brief.author.sponsorCode ?? "N/A"}`}</Typography>
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`Budget: ${moneyFormatter(
						brief.currency
					).format(brief.budget)}`}</Typography>
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`DueDate: ${dateFormatter(
						brief.dueDate
					)}`}</Typography>
				</ListItem>
			</List>
		);
	};

	renderTrackInfo = (track) => {
		return (
			<List>
				<ListItem>
					<Typography variant="h6" sx={{ mr: 1 }}>
						Track:
					</Typography>
					<TrackLink track={track} />
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`Submitted by ${
						track.author.firstName
					} ${track.author.lastName} - ${track.author.email} - ${
						track.author.pitchSubscriptionPlan
					} - Commision: ${
						pitchPlanToCommisionDict[track.author.pitchSubscriptionPlan]
					}%`}</Typography>
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`Master Contact: ${track.masterContact}`}</Typography>
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`Publisher Contact: ${track.publisherContact}`}</Typography>
				</ListItem>
			</List>
		);
	};

	handleJobDoneChange = (event) => {
		// Update Licensing Job Status
		const updatedLicensingJob = this.props.licensingJob;
		updatedLicensingJob.done = event.target.checked;
		this.props.editLicensingJob(updatedLicensingJob);
		// Update Application Status
		const updatedApplication = this.props.licensingJob.application;
		updatedApplication.licensingJobStatus = "Obtained";
		this.props.likeApplication(updatedApplication);
	};

	render() {
		const job = this.props.licensingJob;
		if (job.brief == null) {
			return null;
		}
		return (
			<Box>
				<ListItem
					sx={{ border: 1, borderRadius: "16px", m: 1 }}
					secondaryAction={
						<>
							<FormControlLabel
								labelPlacement="start"
								control={
									<Checkbox
										checked={job.done}
										onChange={this.handleJobDoneChange}
										inputProps={{ "aria-label": "controlled" }}
									/>
								}
								label="Licensing Job Done"
							/>
						</>
					}
				>
					<ListItemAvatar>
						<Avatar sx={{ bgcolor: "#458FF7" }}>
							<AudiotrackIcon color="primary" />
						</Avatar>
					</ListItemAvatar>
					<Stack>
						{this.renderBriefInfo(this.props.licensingJob.brief)}
						{this.renderTrackInfo(this.props.licensingJob.track)}
					</Stack>
				</ListItem>
			</Box>
		);
	}
}

export default connect(mapStateToProps, { editLicensingJob, likeApplication })(
	LicensingJobCard
);
