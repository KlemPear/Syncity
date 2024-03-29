import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	addTokensToUser,
	cleanSearchedUser,
	editUser,
	editUserNoPayload,
	createNotification,
} from "../../actions";
import TransitionModal from "../Modal";
import UserSearch from "./UserSearch";
import payments from "../../apis/payments";

//mui
import {
	Button,
	Typography,
	Box,
	Divider,
	List,
	ListItemText,
	Stack,
} from "@mui/material";

const PlanFormatterDict = {
	freePlan: "Free Plan",
	basicBriefPlan: "Basic Brief Plan",
	proBriefPlan: "Pro Brief Plan",
	businessBriefPlan: "Business Brief Plan",
	basicPitchPlan: "Basic Application Plan",
	proPitchPlan: "Pro Application Plan",
	businessPitchPlan: "Business Application Plan",
	freeTrial: "Free Trial",
};

class ShowUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showModal: false };
	}

	onDismissModal = () => {
		this.props.cleanSearchedUser();
		this.setState({ showModal: false });
	};

	onAddConnectionsClick = () => {
		this.setState({ showModal: true });
	};

	onAddSearchedUser = () => {
		console.log(this.props.searchedUser);
		const updatedUser = this.props.currentUser;
		updatedUser.connections.push(this.props.searchedUser._id);
		this.props.editUser(updatedUser);
		// then we also need to update the search user
		// to reflect the new connection
		const updatedSearchedUser = this.props.searchedUser;
		updatedSearchedUser.connections.push(updatedUser._id);
		this.props.editUserNoPayload(updatedSearchedUser);
		// then we need to notify the other user that they have a new connection
		const notif = {
			title: "New Connection!",
			description: `${updatedUser.firstName} ${updatedUser.lastName} added you as a connection!`,
			link: "/profile",
			date: Date.now(),
			user: updatedSearchedUser._id,
		};
		this.props.createNotification(notif);
		this.onDismissModal();
	};

	onStripeBillingSubmit = async (event, customerId) => {
		event.preventDefault();
		const response = await payments.post(`/create-portal-session`, {
			customerId,
		});
		const redirectUrl = response.data;
		window.location.href = redirectUrl;
	};

	renderModalContent() {
		return (
			<>
				<UserSearch onAddSearchedUser={this.onAddSearchedUser} />
			</>
		);
	}

	renderModalActions() {
		return (
			<>
				<Button
					variant="contained"
					color="primary"
					onClick={() => this.onDismissModal()}
				>
					Cancel
				</Button>
			</>
		);
	}

	renderUserProfile() {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Stack spacing={2}>
					<Typography
						variant="h2"
						sx={{
							fontWeight: 700,
							letterSpacing: ".2rem",
							color: "inherit",
							textDecoration: "none",
							display: "flex",
							justifyContent: "center",
						}}
					>
						{this.props.currentUser.firstName} {this.props.currentUser.lastName}
					</Typography>
					<Typography sx={{ display: "flex", justifyContent: "center" }}>
						Email: {this.props.currentUser.email}
					</Typography>
					<Typography sx={{ display: "flex", justifyContent: "center" }}>
						{this.props.currentUser.bio}
					</Typography>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Button
							variant="outlined"
							component={Link}
							to={`/forgot-password/reset/${this.props.currentUser.confirmationCode}`}
						>
							Change Password
						</Button>
					</Box>
					<Divider variant="middle" sx={{ margin: 1, bgcolor: "black" }} />
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							flexDirection: "column",
						}}
					>
						<Typography sx={{ mb: 2 }} variant="h5">
							Current Subscription Plans
						</Typography>
						<ul>
							<li>
								<Typography variant="h6">
									Brief Plan:{" "}
									{this.props.currentUser.briefSubscriptionPlan === "Verified"
										? "Verified"
										: "Not Verified."}
								</Typography>
								<ul>
									<li>
										{this.props.currentUser.briefSubscriptionPlan ===
										"Verified" ? (
											"Your account was verified, you can post unlimited briefs."
										) : (
											<Button
												component="a"
												href="https://tally.so/r/wob4vP"
												target="_blank"
											>
												Become a verified Briefer.
											</Button>
										)}
									</li>
								</ul>
							</li>
							<li>
								<Typography variant="h6">
									Application Plan:{" "}
									{this.props.currentUser.pitchSubscriptionPlan
										? PlanFormatterDict[
												this.props.currentUser.pitchSubscriptionPlan
										  ]
										: "No Plan."}
								</Typography>
								<ul>
									<li>
										{this.props.currentUser.pitchTokens === -1
											? "unlimited"
											: this.props.currentUser.pitchTokens}{" "}
										applications remaining
										{!this.props.currentUser.stripeCustomerId
											? "."
											: " for this billing period."}
									</li>
								</ul>
							</li>
						</ul>
						<Box
							sx={{
								mt: 2,
								display: "flex",
								justifyContent: "center",
							}}
						>
							{this.props.currentUser.stripeCustomerId ? (
								<form
									onSubmit={(event) =>
										this.onStripeBillingSubmit(
											event,
											this.props.currentUser.stripeCustomerId
										)
									}
								>
									<Button
										variant="contained"
										color="secondary"
										id="checkout-and-portal-button"
										type="submit"
									>
										Manage your billing information
									</Button>
								</form>
							) : (
								<Button
									variant="contained"
									color="secondary"
									component={Link}
									to="/buy-tokens"
								>
									Subscribe to a plan
								</Button>
							)}
						</Box>
					</Box>
					<Divider variant="middle" sx={{ margin: 1, bgcolor: "black" }} />
					<Box
						spacing={2}
						sx={{
							justifyContent: "space-evenly",
						}}
						id="connections"
					>
						<Typography sx={{ mb: 2 }} variant="h5">
							Connections
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								maxHeight: 200,
								overflow: "hidden",
								overflowY: "auto",
							}}
						>
							<List dense>
								{this.props.currentUser.connections
									? this.props.currentUser.connections.map((connection) => (
											<ListItemText
												key={connection._id}
											>{`${connection.firstName} ${connection.lastName} - ${connection.email}`}</ListItemText>
									  ))
									: null}
							</List>
						</Box>
						<Button
							variant="contained"
							color="secondary"
							className="ui classic blue button"
							onClick={() => this.onAddConnectionsClick()}
							sx={{ mt: 2 }}
						>
							Find new connections
						</Button>
						<TransitionModal
							showModal={this.state.showModal}
							title={"Find new connections"}
							content={this.renderModalContent()}
							actions={this.renderModalActions()}
							onDismiss={() => this.onDismissModal()}
						/>
					</Box>
				</Stack>
			</Box>
		);
	}

	render() {
		if (!this.props.currentUser) {
			return <Box>There are no signed in user.</Box>;
		}
		return this.renderUserProfile();
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.auth?.user,
		searchedUser: state.auth.searchedUser ?? null,
	};
};

export default connect(mapStateToProps, {
	addTokensToUser,
	cleanSearchedUser,
	editUser,
	editUserNoPayload,
	createNotification,
})(ShowUser);
