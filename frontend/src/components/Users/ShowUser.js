import React from "react";
import { connect } from "react-redux";

class ShowUser extends React.Component {
	renderUserCard() {
		if (!this.props.user) {
			return <div>Loading User...</div>;
		}
		return (
			<div>
				<div>
					{this.props.user.firstName} {this.props.user.lastName}
				</div>
				<div>Bio: {this.props.user.bio}</div>
				<hr />
			</div>
		);
	}

	renderUserProfile() {
		return (
			<div>
				<h3>User Profile</h3>
				<div>First Name: {this.props.currentUser.firstName}</div>
				<div>Last Name: {this.props.currentUser.lastName}</div>
				<hr />
				<div>Bio: {this.props.currentUser.bio}</div>
			</div>
		);
	}

	render() {
		if (this.props.user) {
			return this.renderUserCard();
		}
		return this.renderUserProfile();
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.auth.user,
	};
};

export default connect(mapStateToProps, null)(ShowUser);
