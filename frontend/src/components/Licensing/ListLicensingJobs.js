import React, { Component } from "react";
import { connect } from "react-redux";
import LicensingJobCard from "./LicensingJobCard";
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
	Stack,
	Typography,
} from "@mui/material";

class ListLicensingJobs extends Component {
	render() {
		if (!this.props.licensingJobs || this.props.licensingJobs.length === 0) {
			return (
				<Box justifyContent="center" alignItems="center" sx={{ mt: 20 }}>
					<Typography
						variant="h3"
						sx={{ display: "flex", justifyContent: "center" }}
					>
						No licensing jobs pending...
					</Typography>
				</Box>
			);
		} else {
			return (
				<>
					<Stack spacing={2}>
						<Typography variant="h3">{`Licensing Jobs`}</Typography>
						<Typography variant="p">
							Here is the list of pending licensing jobs. Take actions, and
							click on "Licensing Job Done" when everything is finished.
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
								{this.props.licensingJobs
									.sort((a, b) => +(a.brief?.dueDate - b.brief?.dueDate))
									.map((licensingJob) => (
										<LicensingJobCard
											key={licensingJob._id}
											licensingJob={licensingJob}
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

function mapStateToProps(state) {
	return {
		licensingJobs: [
			{
				_id: 1,
				brief: {
					_id: 123,
					title: "brief title",
					budget: "100",
					dueDate: Date.now(),
					author: {
						firstName: "Arlette",
						lastName: "Chabot",
						email: "alertte.chabot@gmail.com",
					},
				},
				track: {
					title: "track title",
					artist: "artist",
					link: "https:///www.youtube.com",
					masterContact: "master@gmail.com",
					publisherContact: "publisher@gmail.com",
					author: {
						firstName: "Jean",
						lastName: "Gabin",
						email: "jean.gabin@gmail.com",
						pitchSubscriptionPlan: "freePlan",
					},
				},
				done: false,
			},
			{
				_id: 2,
				brief: {
					_id: 456,
					title: "brief title",
					budget: "100",
					dueDate: Date.now(),
					author: {
						firstName: "Arlette",
						lastName: "Chabot",
						email: "alertte.chabot@gmail.com",
					},
				},
				track: {
					title: "track title",
					artist: "artist",
					link: "https:///www.youtube.com",
					masterContact: "master@gmail.com",
					publisherContact: "publisher@gmail.com",
					author: {
						firstName: "Jean",
						lastName: "Gabin",
						email: "jean.gabin@gmail.com",
						pitchSubscriptionPlan: "freePlan",
					},
				},
				done: true,
			},
		],
	};
}

export default connect(mapStateToProps)(ListLicensingJobs);
