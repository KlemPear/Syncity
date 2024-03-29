import {
	usersTypes,
	briefsTypes,
	applicationsTypes,
	tracksTypes,
	trackPlayerTypes,
	notificationsTypes,
	licensingJobsTypes,
} from "./types";
import history from "../util/history";
import users from "../apis/users";
import briefs from "../apis/briefs";
import applications from "../apis/applications";
import tracks from "../apis/tracks";
import notifications from "../apis/notifications";
import licensingJobs from "../apis/licensingJobs";

//#region Users
export const registerUser = (body) => async (dispatch, getState) => {
	const response = await users.post(`/register`, body);

	// do some programmatic navigation to get the user
	// back to the main page
	if (response.status === 200) {
		dispatch({ type: usersTypes.REGISTER_USER, payload: response.data });
		history.push("/user-status-pending");
	}
	if (response.status === 202) {
		history.push("/user-already-created");
	}
};

export const loginUser = (formValues) => async (dispatch, getState) => {
	try {
		const response = await users.post(`/login`, formValues);
		dispatch({ type: usersTypes.LOGIN_USER, payload: response.data });

		const response2 = await notifications.get(`/`, {
			params: { user: response.data._id },
		});
		dispatch({
			type: notificationsTypes.FETCH_NOTIFICATIONS,
			payload: response2.data,
		});
		// do some programmatic navigation to get the user
		// back to the main page
		history.push("/list-briefs");
	} catch (error) {
		dispatch({ type: usersTypes.UNAUTHORIZED });
	}
};

export const verifyUser = (confirmationCode) => async (dispatch, getState) => {
	const response = await users.get(`/confirm/${confirmationCode}`);
	console.log(response.data);
	dispatch({ type: usersTypes.VERIFY_USER, payload: response.data });
};

export const logOutUser = () => async (dispatch, getState) => {
	const response = await users.get(`/logout`);
	dispatch({ type: usersTypes.LOGOUT_USER, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/");
};

export const addTokensToUser =
	(userId, numberOfTokens) => async (dispatch, getState) => {
		const response = await users.post(`${userId}/tokens`, {
			tokens: numberOfTokens,
		});
		dispatch({ type: usersTypes.ADD_TOKENS, payload: response.data });
	};

export const burnBriefToken = (userId) => async (dispatch, getState) => {
	const response = await users.post(`${userId}/burn-brief-token`, {});
	dispatch({ type: usersTypes.ADD_TOKENS, payload: response.data });
};

export const burnPitchToken = (userId) => async (dispatch, getState) => {
	const response = await users.post(`${userId}/burn-pitch-token`, {});
	dispatch({ type: usersTypes.ADD_TOKENS, payload: response.data });
};

export const searchUser = (query) => async (dispatch, getState) => {
	const response = await users.post(`search`, query);
	dispatch({ type: usersTypes.SEARCH_USER, payload: response.data });
};

export const getUserByConfirmationCode =
	(confirmationCode) => async (dispatch, getState) => {
		const response = await users.get(`reset-password/${confirmationCode}`);
		dispatch({
			type: usersTypes.GET_USER_BY_CONFIRMATION_CODE,
			payload: response.data,
		});
	};

export const inviteNewUser = (body) => async (dispatch, getState) => {
	const response = await users.post(`invite`, body);
	dispatch({ type: usersTypes.INVITE_NEW_USER, payload: response.data });
};

export const userForgotPassword = (body) => async (dispatch, getState) => {
	const response = await users.post(`forgot-password`, body);
	console.log(response);
	if (response.status === 200) {
		dispatch({
			type: usersTypes.USER_FOUND,
			payload: response.data,
		});
	} else {
		console.log(response.status);
		dispatch({ type: usersTypes.USER_NOT_FOUND });
	}
};

export const updateUserPassword =
	(confirmationCode, formValues) => async (dispatch, getState) => {
		const response = await users.post(
			`/reset-password/${confirmationCode}`,
			formValues
		);
		dispatch({ type: usersTypes.UPDATE_USER_PASSWORD, payload: response.data });
		history.push("/login");
	};

export const cleanSearchedUser = () => async (dispatch, getState) => {
	dispatch({ type: usersTypes.CLEAN_SEARCH_USER });
};

export const editUser = (user) => async (dispatch, getState) => {
	const response = await users.put(`${user._id}`, user);
	dispatch({ type: usersTypes.EDIT_USER, payload: response.data });
};

export const editUserNoPayload = (user) => async (dispatch, getState) => {
	const response = await users.put(`${user._id}`, user);
	dispatch({ type: usersTypes.EDIT_USER_NO_PAYLOAD, payload: response.data });
};

//#endregion

//#region Briefs
export const fetchBriefs =
	(query = null) =>
	async (dispatch, getState) => {
		if (query) {
			const response = await briefs.get("/", { params: query });
			dispatch({ type: briefsTypes.FETCH_BRIEFS, payload: response.data });
		} else {
			const response = await briefs.get("/");
			dispatch({ type: briefsTypes.FETCH_BRIEFS, payload: response.data });
		}
	};

export const fetchPrivateBriefs = (id) => async (dispatch, getState) => {
	const response = await briefs.get(`/private/${id}`);
	dispatch({ type: briefsTypes.FETCH_PRIVATE_BRIEFS, payload: response.data });
};

export const fetchBrief = (id) => async (dispatch, getState) => {
	const response = await briefs.get(`/${id}`);
	dispatch({ type: briefsTypes.FETCH_BRIEF, payload: response.data });
};

export const createBrief = (body) => async (dispatch, getState) => {
	const response = await briefs.post(`/`, body);
	dispatch({ type: briefsTypes.CREATE_BRIEF, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/brief-creation-success");
};

export const editBrief = (body) => async (dispatch, getState) => {
	const response = await briefs.put(`/${body._id}`, body);
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

//#region Application

export const fetchApplications = (query) => async (dispatch, getState) => {
	const response = await applications.get(`/`, { params: query });
	dispatch({
		type: applicationsTypes.FETCH_APPLICATIONS,
		payload: response.data,
	});
};

export const fetchUserLikedApplications =
	(query) => async (dispatch, getState) => {
		const response = await applications.get(`/liked`, { params: query });
		dispatch({
			type: applicationsTypes.FETCH_APPLICATIONS,
			payload: response.data,
		});
	};

export const fetchUserSuccessfulApplications =
	(query) => async (dispatch, getState) => {
		const response = await applications.get(`/successful`, { params: query });
		dispatch({
			type: applicationsTypes.FETCH_APPLICATIONS,
			payload: response.data,
		});
	};

export const createApplication = (body) => async (dispatch, getState) => {
	const response = await applications.post(`/`, body);
	dispatch({
		type: applicationsTypes.CREATE_APPLICATION,
		payload: response.data,
	});
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/application-creation-success");
};

export const editApplication = (body) => async (dispatch, getState) => {
	const response = await applications.put(`/${body._id}`, body);
	dispatch({
		type: applicationsTypes.EDIT_APPLICATION,
		payload: response.data,
	});
};

export const likeApplication = (body) => async (dispatch, getState) => {
	const response = await applications.put(`/${body._id}/like`, body);
	dispatch({
		type: applicationsTypes.EDIT_APPLICATION,
		payload: response.data,
	});
};

//#endregion

//#region Tracks

export const fetchTracks = (query) => async (dispatch, getState) => {
	const response = await tracks.get(`/`, { params: query });
	dispatch({ type: tracksTypes.FETCH_TRACKS, payload: response.data });
};

export const createTrack =
	(body, pushToCatalog) => async (dispatch, getState) => {
		const response = await tracks.post(`/`, body);
		dispatch({ type: tracksTypes.CREATE_TRACK, payload: response.data });
		// do some programmatic navigation to get the user
		// back to the catalog page
		if (pushToCatalog) {
			history.push("/catalog");
		}
	};

export const fetchTrack = (trackId) => async (dispatch, getState) => {
	const response = await tracks.get(`/${trackId}`);
	dispatch({ type: tracksTypes.FETCH_TRACK, payload: response.data });
};

export const editTrack = (body) => async (dispatch, getState) => {
	const response = await tracks.put(`/${body._id}`, body);
	dispatch({ type: tracksTypes.EDIT_TRACK, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the catalog page
	history.push("/catalog");
};

export const deleteTrack = (id) => async (dispatch, getState) => {
	const response = await tracks.delete(`/${id}`);
	dispatch({ type: tracksTypes.DELETE_TRACK, payload: response.data });
	// do some programmatic navigation to get the user
	// back to the main page
	history.push("/catalog");
};
//#endregion

//#region TrackPlayer

export const playTrack = (track) => async (dispatch, getState) => {
	dispatch({ type: trackPlayerTypes.PLAY_TRACK, payload: track });
};

export const closeTrack = () => async (dispatch, getState) => {
	dispatch({ type: trackPlayerTypes.CLOSE_TRACK });
};

//#endregion

//#region Notifications

export const fetchNotifications = (query) => async (dispatch, getState) => {
	const response = await notifications.get(`/`, { params: query });
	dispatch({
		type: notificationsTypes.FETCH_NOTIFICATIONS,
		payload: response.data,
	});
};

export const createNotification = (body) => async (dispatch, getState) => {
	const response = await notifications.post(`/`, body);
	dispatch({
		type: notificationsTypes.CREATE_NOTIFICATION,
		payload: response.data,
	});
};

export const fetchNotification =
	(NotificationId) => async (dispatch, getState) => {
		const response = await notifications.get(`/${NotificationId}`);
		dispatch({
			type: notificationsTypes.FETCH_NOTIFICATION,
			payload: response.data,
		});
	};

export const editNotification = (body) => async (dispatch, getState) => {
	const response = await notifications.put(`/${body._id}`, body);
	dispatch({
		type: notificationsTypes.EDIT_NOTIFICATION,
		payload: response.data,
	});
};

export const deleteNotification = (id) => async (dispatch, getState) => {
	const response = await notifications.delete(`/${id}`);
	dispatch({
		type: notificationsTypes.DELETE_NOTIFICATION,
		payload: response.data,
	});
};

//#endregion

//#region Licensing Jobs

export const fetchLicensingJobs = (query) => async (dispatch, getState) => {
	const response = await licensingJobs.get(`/`, { params: query });
	dispatch({
		type: licensingJobsTypes.FETCH_LICENSINGJOBS,
		payload: response.data,
	});
};

export const createLicensingJob = (body) => async (dispatch, getState) => {
	const response = await licensingJobs.post(`/`, body);
	dispatch({
		type: licensingJobsTypes.CREATE_LICENSINGJOB,
		payload: response.data,
	});
};

export const fetchLicensingJob = (jobId) => async (dispatch, getState) => {
	const response = await licensingJobs.get(`/${jobId}`);
	dispatch({
		type: licensingJobsTypes.FETCH_LICENSINGJOB,
		payload: response.data,
	});
};

export const editLicensingJob = (body) => async (dispatch, getState) => {
	const response = await licensingJobs.put(`/${body._id}`, body);
	dispatch({
		type: licensingJobsTypes.EDIT_LICENSINGJOB,
		payload: response.data,
	});
};

export const deleteLicensingJob = (id) => async (dispatch, getState) => {
	const response = await licensingJobs.delete(`/${id}`);
	dispatch({
		type: licensingJobsTypes.DELETE_LICENSINGJOB,
		payload: response.data,
	});
};

//#endregion
