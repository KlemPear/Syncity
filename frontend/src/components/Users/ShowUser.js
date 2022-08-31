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

class ShowUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showModal: false };
	}

	onDismissModal = () => {
		this.props.cleanSearchedUser();
		this.setState({ showModal: false });
	};

	onMoreTokensClick = () => {
		this.props.addTokensToUser(this.props.currentUser._id, 10);
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
			<div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<h3>User Profile</h3>
				<div>First Name: {this.props.currentUser.firstName}</div>
				<div>Last Name: {this.props.currentUser.lastName}</div>
				<div>
					Number of <i className="gem fitted circular inverted outline icon" />:{" "}
					{this.props.currentUser.tokens}
				</div>
				<hr />
				<div>Bio: {this.props.currentUser.bio}</div>
				<hr />
				<div>
					<button
						className="ui classic green button"
						onClick={() => this.onMoreTokensClick()}
					>
						Add 10 <i className="gem fitted circular inverted outline icon" />
					</button>
					<hr />
					<div>
						<h4>Subscription Plans</h4>
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
					</div>
					<div>
						{this.props.currentUser.stripeCustomerId ? (
							<form
								onSubmit={(event) =>
									this.onStripeBillingSubmit(
										event,
										this.props.currentUser.stripeCustomerId
									)
								}
							>
								<button
									className="ui button primary"
									id="checkout-and-portal-button"
									type="submit"
								>
									Manage your billing information
								</button>
							</form>
						) : null}
					</div>
					<hr />
					<div>
						<h2>Connections</h2>
						<div>
							{this.props.currentUser.connections
								? this.props.currentUser.connections.map((connection) => (
										<div
											key={connection._id}
										>{`${connection.firstName} ${connection.lastName} - ${connection.email}`}</div>
								  ))
								: null}
						</div>
						<button
							className="ui classic blue button"
							onClick={() => this.onAddConnectionsClick()}
						>
							Find new connections
						</button>
						{this.state.showModal ? (
							<Modal
								title={"Find new connections"}
								content={this.renderModalContent()}
								actions={this.renderModalActions()}
								onDismiss={() => this.onDismissModal()}
							/>
						) : null}
					</div>
				</div>
			</div>
		);
	}

	render() {
		if (!this.props.currentUser) {
			return <div>There are no signed in user.</div>;
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
