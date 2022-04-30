import React from "react";
import UserSearchForm from "./UserSearchForm";
import { searchUser, inviteNewUser } from "../../actions";
import { connect } from "react-redux";

class UserSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = { search: 0, email: null };
	}

	onSubmit = (formValues) => {
		if (Object.keys(formValues).length === 0) {
			console.log("No email submitted");
			return null;
		} else {
			this.setState({ search: this.state.search + 1, email: formValues.email });
			this.props.searchUser(formValues);
		}
	};

	onAddSearchedUser = () => {
		if (this.props.searchedUser === null) {
			return;
		}
		if (
			this.props.currentUser.connections
				.map((c) => c._id)
				.includes(this.props.searchedUser._id)
		) {
			alert("You are already connected with this person!");
			return console.log("connection already made.");
		} else {
			this.props.onAddSearchedUser();
		}
	};

	renderUserNotFound() {
		return (
			<div>
				<p>{`There are no user with the email address ${this.state.email} in our database.`}</p>
				<p>Would you like to invite them to join akapela?</p>
				<div
					className="button ui blue inverted"
					onClick={() => this.sendInvite(this.state.email)}
				>
					Send Invite
				</div>
			</div>
		);
	}

	sendInvite(email) {
		const body = {
			inviteFrom:
				this.props.currentUser.firstName +
				" " +
				this.props.currentUser.lastName,
			inviteTo: email,
		};
		console.log("Sending invitation: ", body);
		if (this.props.invitedUser === body.inviteTo) {
			return alert("Invite already sent!");
		} else {
			this.props.inviteNewUser(body);
			return alert("Invitation sent!");
		}
	}

	render() {
		return (
			<div>
				<h5>Search for an email address</h5>
				<UserSearchForm onSubmit={this.onSubmit} />
				<div>
					{this.props.searchedUser != null
						? `${this.props.searchedUser?.firstName} ${this.props.searchedUser?.lastName} - ${this.props.searchedUser?.email}`
						: this.state.search === 0
						? null
						: this.renderUserNotFound()}
				</div>
				<hr></hr>
				<div>
					<button
						className="ui green button"
						onClick={() => this.onAddSearchedUser()}
					>
						Add connection
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentUser: state.auth?.user,
		searchedUser: state.auth.searchedUser ?? null,
		invitedUser: state.auth.invitedUser ?? null,
	};
};

export default connect(mapStateToProps, { searchUser, inviteNewUser })(
	UserSearch
);
