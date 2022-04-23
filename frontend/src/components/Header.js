import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../actions";

class Header extends React.Component {
	onLogOutSubmit = () => {
		this.props.logOutUser();
	};

	renderUserDrowndownMenu() {
		return (
			<div className="right menu">
				<div className="ui simple dropdown item">
					Account <i className="user large icon"></i>
					<div className="menu">
						<Link to="/buy-tokens" className="item right">
							{this.props.user.tokens}
							<i className="gem fitted circular inverted outline icon" />
						</Link>
						<Link to="/profile" className="item">
							Profile
						</Link>
						<Link
							to="/"
							className="ui negative basic button item"
							onClick={this.onLogOutSubmit}
						>
							Log out
						</Link>
					</div>
				</div>
			</div>
		);
	}

	render() {
		if (this.props.isSignedIn && !this.props.isUserPending) {
			return (
				<div className="ui fixed top stackable menu">
					<Link to="/" className="item">
						akapela
					</Link>
					<Link to="/list-briefs" className="item">
						Briefs
					</Link>
					<Link to="/list-applications" className="item">
						{`Your Applications`}
					</Link>
					{this.renderUserDrowndownMenu()}
				</div>
			);
		} else if (this.props.isUserPending) {
			return (
				<div className="ui fixed top stackable menu">
					<Link to="/" className="item">
						akapela
					</Link>
					<Link to="/user-status-pending" className="item">
						Briefs
					</Link>
					<Link to="/user-status-pending" className="item">
						{`Your Applications`}
					</Link>
					<Link
						to="/"
						className="ui negative basic button item"
						onClick={this.onLogOutSubmit}
					>
						Log out
					</Link>
				</div>
			);
		} else {
			return (
				<div className="ui top fixed stackable menu">
					<Link to="/" className="item">
						akapela
					</Link>
					<Link to="/register" className="item">
						Sign Up
					</Link>
					<Link to="/login" className="item">
						Sign In
					</Link>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		isUserPending: state.auth.user?.status === "Pending",
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { logOutUser })(Header);
