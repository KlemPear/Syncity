import { usersTypes } from "../actions/types";

const INITIAL_STATE = {
	isSignedIn: null,
	unauthorized: false,
	user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case usersTypes.REGISTER_USER:
			return {
				...state,
				isSignedIn: true,
				user: action.payload,
				unauthorized: false,
			};
		case usersTypes.LOGIN_USER:
			return {
				...state,
				isSignedIn: true,
				user: action.payload,
				unauthorized: false,
			};
		case usersTypes.LOGOUT_USER:
			return { ...state, isSignedIn: false, user: action.payload };
		case usersTypes.UNAUTHORIZED:
			return { ...state, isSignedIn: false, user: null, unauthorized: true };
		default:
			return state;
	}
};

export default authReducer;
