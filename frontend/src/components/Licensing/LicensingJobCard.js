import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TrackLink from "../Catalog/TrackLink";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";
//mui
import {
	List,
	ListItem,
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Box,
	Button,
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
	basicPitchPlan: 20,
	proPitchPlan: 15,
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
						{brief.title}
					</MuiLink>
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`Submitted by ${brief.author.firstName} ${brief.author.lastName} - ${brief.author.email}`}</Typography>
				</ListItem>
				<ListItem>
					<Typography variant="body2">{`Budget: ${moneyFormatter.format(
						brief.budget
					)}`}</Typography>
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
		console.log(`${this.props.licensingJob._id}: `, event.target.checked);
	};

	render() {
		const job = this.props.licensingJob;
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
										defaultChecked={job.done}
										onChange={this.handleJobDoneChange}
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

export default connect(mapStateToProps)(LicensingJobCard);
