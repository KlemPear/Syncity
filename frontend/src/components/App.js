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

class App extends React.Component {
	render() {
		return (
			<div className="ui container app">
				<Header />
				<Switch>
					<Route path="/register" exact component={Register} />
					<Route path="/login" exact component={Login} />
					<Route path="/" exact component={LandingPage} />
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
	};
};

export default connect(mapStateToProps, null)(App);
