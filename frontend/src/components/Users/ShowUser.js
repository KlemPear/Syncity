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
		if (
			this.props.searchedUser == null ||
			this.props.currentUser.connections
				.map((c) => c._id)
				.includes(this.props.searchedUser._id)
		) {
			alert("You are already connected with this person!");
			return console.log("connection already made.");
		} else {
			const updatedUser = this.props.currentUser;
			updatedUser.connections.push(this.props.searchedUser._id);
			this.props.editUser(updatedUser);
			// then we also need to update the search user
			// to reflect the new connection
			const updatedSearchedUser = this.props.searchedUser;
			updatedSearchedUser.connections.push(updatedUser._id);
			this.props.editUserNoPayload(updatedSearchedUser);
			this.onDismissModal();
		}
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
