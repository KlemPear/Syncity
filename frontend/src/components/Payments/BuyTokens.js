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
} from "@mui/material";

class BuyTokens extends React.Component {
	constructor(props) {
		super(props);
		this.state = { briefPlans: true };
	}

	onSelectBriefPlans = () => {
		this.setState({ briefPlans: true });
	};

	onSelectPitchPlans = () => {
		this.setState({ briefPlans: false });
	};

	renderPlanOption = (itemId, amount, name, user, description = null) => {
		return (
			<Grid item xs={1} sm={1} md={1} lg={1}>
				<Card
					variant="outlined"
					elevation={3}
					sx={{
						m: 0.5,
						minWidth: 250,
						minHeight: 275,
						alignItems: "stretch",
						display: "flex",
						flexDirection: 'column',
						justifyContent: 'space-between'
					}}
				>
					<CardContent>
						<Typography variant="h4" centered>
							{name}
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							${amount}
						</Typography>
						<Typography variant="body2">{description}</Typography>
					</CardContent>
					<CardActions sx={{justifyContent: 'center'}}>
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

	renderBriefPlans = () => {
		return (
			<Grid
				container
				spacing={{ xs: 1, md: 2 }}
				columns={{ xs: 1, sm: 2, lg: 4 }}
				justifyContent="space-evenly"
			>
				{this.renderPlanOption(
					"freePlan",
					"0.00/month",
					"Free Plan",
					this.props.user,
					"1 brief per month."
				)}
				{this.renderPlanOption(
					"basicBriefPlan",
					"19.00/month",
					"Basic Brief Plan",
					this.props.user,
					"5 briefs per month."
				)}
				{this.renderPlanOption(
					"proBriefPlan",
					"49.00/month",
					"Pro Brief Plan",
					this.props.user,
					"15 briefs per month."
				)}
				{this.renderPlanOption(
					"businessBriefPlan",
					"99.00/month",
					"Business Brief Plan",
					this.props.user,
					"Unlimited briefs."
				)}
			</Grid>
		);
	};

	renderPitchPlans = () => {
		return (
			<Grid
				container
				spacing={{ xs: 1, md: 2 }}
				columns={{ xs: 1, sm: 2, lg: 4 }}
				justifyContent="space-evenly"
			>
				{this.renderPlanOption(
					"freePlan",
					"0.00/month",
					"Free Plan",
					this.props.user,
					"5 applications per month."
				)}
				{this.renderPlanOption(
					"basicPitchPlan",
					"15.00/month",
					"Basic Applications Plan",
					this.props.user,
					"25 applications per month."
				)}
				{this.renderPlanOption(
					"proPitchPlan",
					"29.00/month",
					"Pro Applications Plan",
					this.props.user,
					"50 applications per month."
				)}
				{this.renderPlanOption(
					"businessPitchPlan",
					"49.00/month",
					"Business Applications Plan",
					this.props.user,
					"Unlimited applications."
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
						Justify
					>
						<Button onClick={this.onSelectBriefPlans}>I need music</Button>
						<Button onClick={this.onSelectPitchPlans}>I make music</Button>
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
