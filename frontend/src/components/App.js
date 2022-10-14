import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
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
import UserAlreadyCreated from "./Users/UserAlreadyCreated";
import ForgotPassword from "./Users/ForgotPassword";
import ResetPassword from "./Users/ResetPassword";
import CreateTrack from "./Catalog/CreateTrack";
import ListTracks from "./Catalog/ListTracks";
import EditTrack from "./Catalog/EditTrack";
import TrackPlayer from "./Catalog/TrackPlayer";
import Appbar from "./Appbar";
import Footer from "./Footer";

//mui
import { Container } from "@mui/material";
import BriefSubmitted from "./Briefs/BriefSubmitted";
import ApplicationSubmitted from "./Applications/ApplicationSubmitted";

class App extends React.Component {
	render() {
		return (
			<>
				<Appbar />
				<Container fixed sx={{ pb: 12 }}>
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
							component={this.props.isSignedIn ? ListBriefs : Register}
						/>
						<Route
							path="/login"
							exact
							component={this.props.isSignedIn ? ListBriefs : Login}
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
							path="/user-already-created"
							exact
							component={UserAlreadyCreated}
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
						<Route
							path="/"
							exact
							component={this.props.isSignedIn ? ListBriefs : Login}
						/>
						<Route path="/forgot-password" exact component={ForgotPassword} />
						<Route
							path="/profile"
							exact
							component={this.props.isSignedIn ? ShowUser : Login}
						/>
						<Route
							path="/list-briefs"
							exact
							component={this.props.isSignedIn ? ListBriefs : Login}
						/>
						<Route
							path="/create-brief"
							exact
							component={this.props.isSignedIn ? CreateBrief : Login}
						/>
						<Route
							path="/show-brief/edit/:id"
							exact
							component={this.props.isSignedIn ? EditBrief : Login}
						/>
						<Route
							path="/show-brief/:id"
							exact
							component={ShowBrief}
						/>
						<Route
							path="/brief-creation-success"
							exact
							component={this.props.isSignedIn ? BriefSubmitted : Login}
						/>
						<Route
							path="/show-brief/:id/applications"
							exact
							component={ShowBriefApplications}
							//http://localhost:3000/show-brief/632149c33408d5d827ce286a/applications
						/>
						<Route
							path="/list-applications"
							exact
							component={this.props.isSignedIn ? ListApplications : Login}
						/>
						<Route
							path="/application-creation-success"
							exact
							component={this.props.isSignedIn ? ApplicationSubmitted : Login}
						/>
						<Route
							path="/buy-tokens"
							exact
							component={this.props.isSignedIn ? BuyTokens : Login}
						/>
						<Route
							path="/catalog"
							exact
							component={this.props.isSignedIn ? ListTracks : Login}
						/>
						<Route
							path="/catalog/:trackId"
							exact
							component={this.props.isSignedIn ? EditTrack : Login}
						/>
						<Route
							path="/create-track"
							exact
							component={this.props.isSignedIn ? CreateTrack : Login}
						/>
						<Redirect to="/list-briefs" />
					</Switch>
				</Container>
				{Object.keys(this.props.trackPlayer).length !== 0 ? (
					<TrackPlayer />
				) : (
					<Footer />
				)}
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		isUserPending: state.auth.user?.status === "Pending",
		trackPlayer: state.trackPlayer,
	};
};

export default connect(mapStateToProps, null)(App);
