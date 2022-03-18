import { usersTypes, briefsTypes } from "./types";
import history from "../util/history";
import users from "../apis/users";
import briefs from "../apis/briefs";

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

//#region Briefs
export const fetchBriefs = () => async (dispatch, getState) => {
	const response = await briefs.get("/");
	dispatch({ type: briefsTypes.FETCH_BRIEFS, payload: response.data });
};

export const fetchBrief = (id) => async (dispatch, getState) => {
	const response = await briefs.get(`/${id}`);
	dispatch({ type: briefsTypes.FETCH_BRIEF, payload: response.data });
};

export const createBrief = (body) => async (dispatch, getState) => {
	const response = await briefs.post(`/create-brief`, body);
	dispatch({ type: briefsTypes.CREATE_BRIEF, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/list-briefs");
};

export const editBrief = (body) => async (dispatch, getState) => {
	const response = await briefs.put(`/edit/${body._id}`, body);
	dispatch({ type: briefsTypes.EDIT_BRIEF, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/list-briefs");
};

export const deleteBrief = (id) => async (dispatch, getState) => {
	const response = await briefs.delete(`/${id}`);
	dispatch({ type: briefsTypes.DELETE_BRIEF, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/list-briefs");
};

//#endregion
