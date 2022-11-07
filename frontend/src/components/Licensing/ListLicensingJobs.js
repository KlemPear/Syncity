import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLicensingJobs } from "../../actions";
import LicensingJobCard from "./LicensingJobCard";
//mui
import { List, Box, Stack, Typography } from "@mui/material";

class ListLicensingJobs extends Component {
	componentDidMount() {
		this.props.fetchLicensingJobs();
	}

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
		licensingJobs: Object.values(state.licensingJobs),
	};
}

export default connect(mapStateToProps, { fetchLicensingJobs })(
	ListLicensingJobs
);
