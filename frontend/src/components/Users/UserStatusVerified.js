import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { verifyUser } from "../../actions";

class UserStatusVerified extends React.Component {
	componentDidMount = () => {
		this.props.verifyUser(this.props.match.params.confirmationCode);
	};

	render() {
		if (this.props.isUserPending) {
			return (
				<div className="container">
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<div className="ui hidden divider"></div>
					<h1>
						<strong>Sorry, we could not verify this email.</strong>
					</h1>
				</div>
			);
		}
		return (
			<div className="container">
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<div className="ui hidden divider"></div>
				<h1>
					<strong>Thank you for verifying your email address!</strong>
				</h1>
				<Link to="/" className="button classic primary">
					Welcome to NOST!
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		unauthorized: state.auth.unauthorized,
		isUserPending: state.auth.user?.status === "Pending",
	};
};

export default connect(mapStateToProps, { verifyUser })(UserStatusVerified);
