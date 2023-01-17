import React from "react";
import { connect } from "react-redux";
import { fetchBriefs, fetchPrivateBriefs } from "../../actions";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import BriefCard from "./BriefCard";
import FilterBriefForm from "./FilterBriefForm";
import Modal from "../Modal";

//mui
import {
	Grid,
	Tabs,
	Tab,
	Fab,
	Stack,
	Box,
	Button,
	Typography,
} from "@mui/material";
import { Public, Lock, AccountBox, Add } from "@mui/icons-material";

class ListBriefs extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 0, userNotVerified: false };
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

	onUserNotVerified = () => {
		this.setState({ userNotVerified: true });
	};

	renderModalContent() {
		return (
			<Typography align="center">
				You cannot create a new brief at the moment. If you wish to become a
				verified briefer please answer our survey below. We will come back to
				you shortly.
			</Typography>
		);
	}

	renderModalActions() {
		return (
			<React.Fragment>
				<Button
					component="a"
					href="https://tally.so/r/wob4vP"
					target="_blank"
					variant="contained"
					color="secondary"
				>
					Verify my account!
				</Button>
			</React.Fragment>
		);
	}

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
						{this.props.user?.briefSubscriptionPlan !== "Verified" ? (
							<Fab
								variant="extended"
								onClick={() => this.onUserNotVerified()}
								color="secondary"
								aria-label="add"
							>
								<Add sx={{ mr: 1 }} />
								New Brief
							</Fab>
						) : (
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
						)}

						{this.state.value === 0 ? (
							<FilterBriefForm onSubmit={this.onBriefFilterSubmit} />
						) : (
							<Box sx={{ display: "flex", flexGrow: 1 }}></Box>
						)}
					</Stack>
					{this.props.briefs.length < 1 ? (
						<Stack
							direction="column"
							sx={{
								display: "flex",
								justifyContent: "center",
								my: 5,
								alignItems: "center",
							}}
						>
							<Typography variant="h5">
								No open brief at the moment, please check back later!
							</Typography>
							<Typography variant="body1">
								If you have a nost account, you will be notified by email when a
								new brief is posted.
							</Typography>
						</Stack>
					) : (
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
					)}
					{this.state.userNotVerified ? (
						<Modal
							showModal={this.state.userNotVerified}
							title={"You are not a verified briefer yet."}
							content={this.renderModalContent()}
							actions={this.renderModalActions()}
							onDismiss={() => this.setState({ userNotVerified: false })}
						/>
					) : null}
				</>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		user: state.auth.user,
		briefs: Object.values(state.briefs),
	};
};

export default connect(mapStateToProps, { fetchBriefs, fetchPrivateBriefs })(
	ListBriefs
);
