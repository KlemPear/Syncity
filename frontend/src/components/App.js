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

class App extends React.Component {
	render() {
		return (
			<div className="ui container app">
				<Header />
				<Switch>
					<Route path="/register" exact component={Register} />
					<Route path="/login" exact component={Login} />
					<Route path="/" exact component={LandingPage} />
					<Route path="/profile" exact component={ShowUser} />
					<Route path="/list-briefs" exact component={ListBriefs} />
					<Route path="/create-brief" exact component={CreateBrief} />
					<Route path="/show-briefs/edit/:id" exact component={EditBrief} />
					<Route path="/show-briefs/:id" exact component={ShowBrief} />
					<Route path="/list-applications" exact component={ListApplications} />
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
