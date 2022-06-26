import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Register from "./Users/Register";
import Login from "./Users/Login";
import LandingPage from "./LandingPage";
import ShowUser from "./Users/ShowUser";
import ListBriefs from "./Briefs/ListBriefs";
import CreateBrief from "./Briefs/CreateBrief";
import ShowBrief from "./Briefs/ShowBrief";
import EditBrief from "./Briefs/EditBrief";
import ListApplications from "./Applications/ListApplications";
import ShowBriefApplications from "./Applications/ShowBriefApplications";
import BuyTokens from "./Payments/BuyTokens";
import PaymentSucceded from "./Payments/PaymentSucceded";
import PaymentCanceled from "./Payments/PaymentCanceled";
import UserStatusPending from "./Users/UserStatusPending";
import UserStatusVerified from "./Users/UserStatusVerified";
import ForgotPassword from "./Users/ForgotPassword";
import ResetPassword from "./Users/ResetPassword";

class App extends React.Component {
	render() {
		return (
			<div className="ui container app">
				<Header />
				<Switch>
					{this.props.isUserPending ? (
						<>
							<Route path="/" exact component={LandingPage} />
							<Route
								path="/register/confirm/:confirmationCode"
								exact
								component={UserStatusVerified}
							/>
							<Route
								path="/user-status-pending"
								exact
								component={UserStatusPending}
							/>
						</>
					) : null}
					<Route
						path="/register"
						exact
						component={this.props.isSignedIn ? LandingPage : Register}
					/>
					<Route
						path="/login"
						exact
						component={this.props.isSignedIn ? LandingPage : Login}
					/>
					<Route
						path="/payment-success"
						exact
						component={this.props.isSignedIn ? PaymentSucceded : Login}
					/>
					<Route
						path="/payment-canceled"
						exact
						component={this.props.isSignedIn ? PaymentCanceled : Login}
					/>
					<Route
						path="/register/confirm/:confirmationCode"
						exact
						component={UserStatusVerified}
					/>
					<Route
						path="/forgot-password/reset/:confirmationCode"
						exact
						component={ResetPassword}
					/>
					<Route path="/" exact component={LandingPage} />
					<Route path="/forgot-password" exact component={ForgotPassword} />
					<Route
						path="/profile"
						exact
						component={this.props.isSignedIn ? ShowUser : LandingPage}
					/>
					<Route
						path="/list-briefs"
						exact
						component={this.props.isSignedIn ? ListBriefs : LandingPage}
					/>
					<Route
						path="/create-brief"
						exact
						component={this.props.isSignedIn ? CreateBrief : LandingPage}
					/>
					<Route
						path="/show-brief/edit/:id"
						exact
						component={this.props.isSignedIn ? EditBrief : LandingPage}
					/>
					<Route
						path="/show-brief/:id"
						exact
						component={this.props.isSignedIn ? ShowBrief : LandingPage}
					/>
					<Route
						path="/show-brief/:id/applications"
						exact
						component={
							this.props.isSignedIn ? ShowBriefApplications : LandingPage
						}
					/>
					<Route
						path="/list-applications"
						exact
						component={this.props.isSignedIn ? ListApplications : LandingPage}
					/>
					<Route
						path="/buy-tokens"
						exact
						component={this.props.isSignedIn ? BuyTokens : LandingPage}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		isUserPending: state.auth.user?.status === "Pending",
	};
};

export default connect(mapStateToProps, null)(App);
