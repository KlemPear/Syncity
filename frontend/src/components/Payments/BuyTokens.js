import React from "react";
import { connect } from "react-redux";
import SimpleStripe from "./SimpleStripe";

//mui
import {
	Grid,
	Button,
	ButtonGroup,
	Typography,
	Stack,
	Card,
	CardContent,
	CardActions,
	CardHeader,
	List,
	ListItem,
	Avatar,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

class BuyTokens extends React.Component {
	constructor(props) {
		super(props);
		this.state = { briefPlans: false };
	}

	onSelectBriefPlans = () => {
		this.setState({ briefPlans: true });
	};

	onSelectPitchPlans = () => {
		this.setState({ briefPlans: false });
	};

	renderPlanOption = (
		itemId,
		amount,
		name,
		user,
		description1 = null,
		description2 = null,
		description3 = null
	) => {
		return (
			<Grid
				item
				xs={1}
				sm={1}
				md={1}
				lg={1}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Card
					elevation={3}
					sx={{
						my: 0.5,
						width: 450,
						height: 370,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<CardHeader
						title={
							<Typography align="center" variant="h4">
								{name}
							</Typography>
						}
						subheader={
							<Typography align="center" variant="h6">
								${amount}
							</Typography>
						}
						sx={{ mt: 2, p: 0 }}
					/>
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<List
							sx={{
								width: "100%",
								maxWidth: 360,
								bgcolor: "background.paper",
							}}
						>
							<ListItem>
								<ListItemAvatar>
									<Avatar sx={{ bgcolor: "background.paper" }}>
										<AudiotrackIcon color="primary" fontSize="small" />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography variant="body1">{description1}</Typography>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar sx={{ bgcolor: "background.paper" }}>
										<AudiotrackIcon color="primary" fontSize="small" />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography variant="body1">{description2}</Typography>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar sx={{ bgcolor: "background.paper" }}>
										<AudiotrackIcon color="primary" fontSize="small" />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography variant="body1">{description3}</Typography>
									}
								/>
							</ListItem>
						</List>
					</CardContent>
					<CardActions sx={{ justifyContent: "center" }}>
						<SimpleStripe
							itemId={itemId}
							amount={amount}
							name={name}
							userId={user._id}
						/>
					</CardActions>
				</Card>
			</Grid>
		);
	};

	renderBriefOption = (verifiedUser = false) => {
		return (
			<Grid item xs={1} sm={1} md={1} lg={1}>
				<Card
					elevation={3}
					sx={{
						my: 0.5,
						minWidth: 400,
						minHeight: 300,
						alignItems: "stretch",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<CardHeader
						title={
							<Typography align="center" variant="h4">
								Become a verified briefer
							</Typography>
						}
						subheader={
							<Typography align="center" variant="h6">
								It's free!
							</Typography>
						}
					/>
					<CardContent>
						<Typography align="center" variant="body2">
							To help maintain our high standards trust and integrity on the
							platform, we require all new accounts who want to submit a brief
							to go trough a verification process.{" "}
						</Typography>
					</CardContent>
					<CardActions sx={{ justifyContent: "center" }}>
						{verifiedUser ? (
							"Your account is already verified!"
						) : (
							<Button
								component="a"
								href="https://tally.so/r/wob4vP"
								target="_blank"
								variant="contained"
								color="secondary"
							>
								Verify my account!
							</Button>
						)}
					</CardActions>
				</Card>
			</Grid>
		);
	};

	renderBriefPlans = () => {
		return (
			<Grid
				container
				spacing={{ xs: 1, md: 2 }}
				columns={{ xs: 1, sm: 1, md: 1, lg: 2 }}
				justifyContent="space-evenly"
			>
				{this.renderBriefOption(
					this.props.user?.briefSubscriptionPlan === "Verified"
				)}
			</Grid>
		);
	};

	renderPitchPlans = () => {
		return (
			<Grid
				container
				spacing={{ xs: 3 }}
				columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}
				alignItems="center"
				justifyContent="space-evenly"
			>
				{this.renderPlanOption(
					"freePlan",
					"0.00/month",
					"Free Plan",
					this.props.user,
					"5 applications per month.",
					"30% Commision on brief budget.",
					"Maximum of 15 uploaded tracks."
				)}
				{this.renderPlanOption(
					"basicPitchPlan",
					"5.00/month",
					"Basic Application Plan",
					this.props.user,
					"15 applications per month.",
					"25% Commision on brief budget.",
					"Maximum of 100 uploaded tracks."
				)}
				{this.renderPlanOption(
					"proPitchPlan",
					"19.00/month",
					"Pro Application Plan",
					this.props.user,
					"30 applications per month.",
					"18% Commission on brief budget.",
					"Maximum of 500 uploaded tracks."
				)}
				{this.renderPlanOption(
					"businessPitchPlan",
					"49.00/month",
					"Business Application Plan",
					this.props.user,
					"Unlimited applications.",
					"10% Commission on brief budget.",
					"Maximum of 1000 uploaded tracks."
				)}
			</Grid>
		);
	};

	render() {
		return (
			<>
				<Stack
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
					spacing={2}
				>
					<Typography variant="h3">Subscription Plans</Typography>
					<ButtonGroup
						variant="outlined"
						color="primary"
						size="small"
						aria-label="outlined button group"
					>
						<Button
							variant={this.state.briefPlans ? "contained" : "outlined"}
							onClick={this.onSelectBriefPlans}
						>
							I need music
						</Button>
						<Button
							variant={!this.state.briefPlans ? "contained" : "outlined"}
							onClick={this.onSelectPitchPlans}
						>
							I make music
						</Button>
					</ButtonGroup>
					{this.state.briefPlans
						? this.renderBriefPlans()
						: this.renderPitchPlans()}
				</Stack>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, null)(BuyTokens);
