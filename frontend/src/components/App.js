import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "../util/History";
import Header from "./Header";
import Register from "./Users/Register";
import Login from "./Users/Login";
import LandingPage from "./LandingPage";

class App extends React.Component {
	render() {
		return (
			<>
				<div className="ui container app">
					<Router history={history}>
						<Header />
						<Switch>
							<Route path="/register" exact component={Register} />
							<Route path="/login" exact component={Login} />
							<Route path="/" exact component={LandingPage} />
						</Switch>
					</Router>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, null)(App);
