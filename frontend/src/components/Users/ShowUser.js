import React from "react";
import { connect } from "react-redux";
import {
	addTokensToUser,
	cleanSearchedUser,
	editUser,
	editUserNoPayload,
} from "../../actions";
import Modal from "../Modal";
import UserSearch from "./UserSearch";
import payments from "../../apis/payments";

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
	Box,
	Container,
	Divider,
} from "@mui/material";

class ShowUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showModal: false };
	}

	onDismissModal = () => {
		this.props.cleanSearchedUser();
		this.setState({ showModal: false });
	};

	// onMoreTokensClick = () => {
	// 	this.props.addTokensToUser(this.props.currentUser._id, 10);
	// };

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
			<div>
				<UserSearch onAddSearchedUser={this.onAddSearchedUser} />
			</div>
		);
	}

	renderModalActions() {
		return (
			<div>
				<button className="ui button" onClick={() => this.onDismissModal()}>
					Cancel
				</button>
			</div>
		);
	}

	renderUserProfile() {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					flexDirection: "column",
					minHeight: 500,
				}}
			>
				<Typography
					variant="h2"
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontWeight: 700,
						letterSpacing: ".2rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
					{this.props.currentUser.firstName} {this.props.currentUser.lastName}
				</Typography>
				<Typography>{this.props.currentUser.bio}</Typography>
				<Divider variant="middle" sx={{ margin: 1 }} />
				<Box
					sx={{
						justifyContent: "space-evenly",
					}}
				>
					<Typography variant="h5">Current Subscription Plans</Typography>
					<ul>
						<li>
							Brief Plan:{" "}
							{this.props.currentUser.briefSubscriptionPlan ?? "no plan"},{" "}
							{this.props.currentUser.briefTokens === -1
								? "unlimited"
								: this.props.currentUser.briefTokens}{" "}
							briefs remaining for this billing period.
						</li>
						<li>
							Pitch Plan:{" "}
							{this.props.currentUser.pitchSubscriptionPlan ?? "no plan"},{" "}
							{this.props.currentUser.pitchTokens === -1
								? "unlimited"
								: this.props.currentUser.pitchTokens}{" "}
							pitches remaining for this billing period.
						</li>
					</ul>

					<Box>
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
						) : null}
					</Box>
				</Box>
				<Divider variant="middle" sx={{ margin: 1 }} />
				<Box
					spacing={2}
					sx={{
						justifyContent: "space-evenly",
					}}
				>
					<Typography variant="h5">Connections</Typography>
					<div>
						{this.props.currentUser.connections
							? this.props.currentUser.connections.map((connection) => (
									<div
										key={connection._id}
									>{`${connection.firstName} ${connection.lastName} - ${connection.email}`}</div>
							  ))
							: null}
					</div>
					<Button
						variant="contained"
						color="secondary"
						className="ui classic blue button"
						onClick={() => this.onAddConnectionsClick()}
					>
						Find new connections
					</Button>
					{this.state.showModal ? (
						<Modal
							title={"Find new connections"}
							content={this.renderModalContent()}
							actions={this.renderModalActions()}
							onDismiss={() => this.onDismissModal()}
						/>
					) : null}
				</Box>
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
})(ShowUser);
