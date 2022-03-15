import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Register from "./Users/Register";
import Login from "./Users/Login";
import LandingPage from "./LandingPage";
import ShowUser from "./Users/ShowUser";
import ListBriefs from "./Briefs/ListBriefs";

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
