import React from "react";
import { connect } from "react-redux";
import { addTokensToUser } from "../../actions";

class ShowUser extends React.Component {
	onMoreTokensClick = () => {
		this.props.addTokensToUser(this.props.currentUser._id, 10);
	};

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
	};
};

export default connect(mapStateToProps, { addTokensToUser })(ShowUser);
