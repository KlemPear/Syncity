import React from "react";
import { connect } from "react-redux";
import {
	fetchApplications,
	fetchUserLikedApplications,
	fetchUserSuccessfulApplications,
} from "../../actions";
import BriefCard from "../Briefs/BriefCard";

//mui
import { Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import { AudioFile, Favorite, EmojiEvents } from "@mui/icons-material";

class ListApplications extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 0 };
	}
	componentDidMount = () => {
		// fetch applications of the user
		this.props.fetchApplications({ author: this.props.userId });
	};

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	onAllApplicationsClick = () => {
		this.props.fetchApplications({ author: this.props.userId });
	};

	onLikedApplicationsClick = () => {
		this.props.fetchUserLikedApplications({ author: this.props.userId });
	};

	onSelectedApplicationsClick = () => {
		this.props.fetchUserSuccessfulApplications({ author: this.props.userId });
	};

	render() {
		return (
			<Box>
				<Tabs
					value={this.state.value}
					onChange={this.handleChange}
					aria-label="icon label tabs example"
					textColor="secondary"
					indicatorColor="secondary"
					centered
					sx={{ my: 5 }}
				>
					<Tab
						icon={<AudioFile />}
						onClick={() => this.onAllApplicationsClick()}
						label="All your applications"
					/>
					<Tab
						icon={<Favorite />}
						onClick={() => this.onLikedApplicationsClick()}
						label="liked applications"
					/>
					<Tab
						icon={<EmojiEvents />}
						onClick={() => this.onSelectedApplicationsClick()}
						label="selected applications"
					/>
				</Tabs>
				{this.props.applications.length === 0 ? (
					<Box justifyContent="center" alignItems="center" sx={{ mt: 20 }}>
						<Typography
							sx={{ display: "flex", justifyContent: "center" }}
							variant="h3"
						>
							No applications were submitted from this account.
						</Typography>
					</Box>
				) : (
					<Grid
						container
						spacing={{ xs: 1, md: 2 }}
						columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}
						justifyContent="space-evenly"
						alignItems="center"
						sx={{ mb: 2 }}
					>
						{this.props.applications.map((application) =>
							application.brief?.title !== undefined ? (
								<Grid
									item
									xs={1}
									sm={1}
									md={1}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
									key={application._id}
								>
									<BriefCard key={application._id} application={application} />
								</Grid>
							) : (
								<React.Fragment key={application._id} />
							)
						)}
					</Grid>
				)}
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		applications: Object.values(state.applications),
	};
};

export default connect(mapStateToProps, {
	fetchApplications,
	fetchUserLikedApplications,
	fetchUserSuccessfulApplications,
})(ListApplications);
