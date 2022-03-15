import { usersTypes } from "./types";
import history from "../util/history";
import users from "../apis/users";

//#region Users
export const registerUser = (body) => async (dispatch, getState) => {
	const response = await users.post(`/register`, body);
	dispatch({ type: usersTypes.REGISTER_USER, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/");
};

export const loginUser = (formValues) => async (dispatch, getState) => {
	try {
		const response = await users.post(`/login`, formValues);
		dispatch({ type: usersTypes.LOGIN_USER, payload: response.data });
		// do some programmatic navigation to get the user
		// back to the main page
		history.push("/");
	} catch (error) {
		dispatch({ type: usersTypes.UNAUTHORIZED });
	}
};

export const logOutUser = () => async (dispatch, getState) => {
	const response = await users.get(`/logout`);
	dispatch({ type: usersTypes.LOGOUT_USER, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/");
};

//#endregion