import React from "react";
import { Link } from "react-router-dom";
//import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";
import { logOutUser } from "../actions";

class Header extends React.Component {
	onLogOutSubmit = () => {
		this.props.logOutUser();
	};

	render() {
		if (this.props.isSignedIn) {
			return (
				<div className="ui secondary pointing menu">
					<Link to="/" className="item">
						Home
					</Link>
					<Link to="/">
						<button
							className="ui btn btn-primary"
							onClick={this.onLogOutSubmit}
						>
							Log Out
						</button>
					</Link>
				</div>
			);
		} else {
			return (
				<div className="ui secondary pointing menu">
					<Link to="/" className="item">
						Home
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
	};
};

export default connect(mapStateToProps, { logOutUser })(Header);
