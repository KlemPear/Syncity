import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reportWebVitals from "./reportWebVitals";
import App from "./components/App";
import reducers from "./reducers";
import { checkLoggedIn } from "./util/session";
import history from "./util/history";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./style/theme";
import CssBaseline from "@mui/material/CssBaseline";

const renderApp = (preloadedState) => {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		reducers,
		preloadedState,
		composeEnhancers(applyMiddleware(reduxThunk))
	);
	ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<App />
				</ThemeProvider>
			</Router>
		</Provider>,
		document.getElementById("root")
	);
};
(async () => renderApp(await checkLoggedIn()))();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
