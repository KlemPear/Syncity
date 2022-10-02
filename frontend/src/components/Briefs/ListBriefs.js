import React from "react";
import { connect } from "react-redux";
import { fetchBriefs, fetchPrivateBriefs } from "../../actions";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import BriefCard from "./BriefCard";
import FilterBriefForm from "./FilterBriefForm";

//mui
import { Grid, Tabs, Tab, Fab, Stack, Box } from "@mui/material";
import { Public, Lock, AccountBox, Add } from "@mui/icons-material";

class ListBriefs extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 0 };
	}
	componentDidMount() {
		this.props.fetchBriefs({ open: true, private: false });
	}

	onYourBriefsClick = () => {
		this.props.fetchBriefs({ author: this.props.userId });
	};

	onAllBriefsClick = () => {
		this.props.fetchBriefs({ open: true, private: false });
	};

	onPrivateBriefsClick = () => {
		this.props.fetchPrivateBriefs(this.props.userId);
	};

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	onBriefFilterSubmit = (formValues) => {
		formValues.open = true;
		formValues.private = false;
		this.props.fetchBriefs(formValues);
	};

	render() {
		if (!this.props.briefs) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return (
				<>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						aria-label="icon label tabs example"
						textColor="secondary"
						indicatorColor="secondary"
						centered
						sx={{ margin: 1 }}
					>
						<Tab
							icon={<Public />}
							onClick={() => this.onAllBriefsClick()}
							label="ALL PUBLIC BRIEFS"
						/>
						<Tab
							icon={<Lock />}
							onClick={() => this.onPrivateBriefsClick()}
							label="PRIVATE BRIEFS"
						/>
						<Tab
							icon={<AccountBox />}
							onClick={() => this.onYourBriefsClick()}
							label="YOUR BRIEFS"
						/>
					</Tabs>
					{/* <Fab
						variant="extended"
						component={Link}
						to="/create-brief"
						color="secondary"
						aria-label="add"
						sx={{ m: 1, mb: 5 }}
					>
						<Add sx={{ mr: 1 }} />
						New Brief
					</Fab> */}
					<Stack
						direction={{ xs: "column", lg: "row" }}
						spacing={2}
						sx={{
							display: "flex",
							justifyContent: "center",
							my: 5,
							alignItems: "center",
						}}
					>
						<Fab
							variant="extended"
							component={Link}
							to="/create-brief"
							color="secondary"
							aria-label="add"
						>
							<Add sx={{ mr: 1 }} />
							New Brief
						</Fab>
						{this.state.value === 0 ? (
							<FilterBriefForm onSubmit={this.onBriefFilterSubmit} />
						) : (
							<Box sx={{ display: "flex", flexGrow: 1 }}></Box>
						)}
					</Stack>
					<Grid
						container
						spacing={{ xs: 1, md: 2 }}
						columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}
						justifyContent="space-around"
						alignItems="center"
						sx={{ mb: 2 }}
					>
						{this.props.briefs.map((brief) => (
							<Grid
								item
								xs={1}
								sm={1}
								md={1}
								key={brief._id}
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<BriefCard key={brief._id} brief={brief} />
							</Grid>
						))}
					</Grid>
				</>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		briefs: Object.values(state.briefs),
	};
};

export default connect(mapStateToProps, { fetchBriefs, fetchPrivateBriefs })(
	ListBriefs
);
