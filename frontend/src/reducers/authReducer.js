import { usersTypes } from "../actions/types";

const INITIAL_STATE = {
	isSignedIn: null,
	unauthorized: false,
	user: null,
	searchedUser: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case usersTypes.REGISTER_USER:
			return {
				...state,
				isSignedIn: false,
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
		case usersTypes.ADD_TOKENS:
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
		case usersTypes.SEARCH_USER:
			return { ...state, searchedUser: action.payload };
		case usersTypes.CLEAN_SEARCH_USER:
			return { ...state, searchedUser: null };
		case usersTypes.EDIT_USER:
			return { ...state, user: action.payload };
		case usersTypes.VERIFY_USER:
			return {
				...state,
				user: action.payload,
				isSignedIn: true,
				unauthorized: false,
			};
		default:
			return state;
	}
};

export default authReducer;
