import React from "react";
import { connect } from "react-redux";
import { fetchApplications } from "../../actions";
import BriefCard from "../Briefs/BriefCard";

//mui
import { Grid, Typography, Box } from "@mui/material";

class ListApplications extends React.Component {
	componentDidMount = () => {
		// fetch applications of the user
		this.props.fetchApplications({ author: this.props.userId });
	};

	render() {
		if (
			!this.props.applications ||
			this.props.applications.length === 0 ||
			this.props.applications?.find((o) => true)?.brief?.title === undefined
		) {
			return (
				<Box justifyContent="center" alignItems="center" sx={{ mt: 20 }}>
					<Typography
						sx={{ display: "flex", justifyContent: "center" }}
						variant="h3"
					>
						You have not submitted any applications yet.
					</Typography>
				</Box>
			);
		} else {
			return (
				<Box sx={{ m: 5 }}>
					<Grid
						container
						spacing={{ xs: 1, md: 2 }}
						columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}
						justifyContent="space-evenly"
					>
						{this.props.applications.map((application) =>
							application.brief?.title !== undefined ? (
								<Grid item xs={1} sm={1} md={1} key={application._id}>
									<BriefCard key={application._id} application={application} />
								</Grid>
							) : (
								<></>
							)
						)}
					</Grid>
				</Box>
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
