import { usersTypes } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  unauthorized: false,
  user: null,
  searchedUser: null,
  invitedUser: null,
  userNotFound: null,
  responseMessage: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case usersTypes.REGISTER_USER:
      return {
        ...state,
        isSignedIn: false,
        user: action.payload,
        unauthorized: false,
        responseMessage: null,
      };
    case usersTypes.LOGIN_USER:
      return {
        ...state,
        isSignedIn: true,
        user: action.payload,
        unauthorized: false,
        responseMessage: null,
      };
    case usersTypes.ADD_TOKENS:
      return {
        ...state,
        user: action.payload,
      };
    case usersTypes.LOGOUT_USER:
      return {
        ...state,
        isSignedIn: false,
        user: action.payload,
        responseMessage: null,
      };
    case usersTypes.UNAUTHORIZED:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        unauthorized: true,
        responseMessage: null,
      };
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
        responseMessage: null,
      };
    case usersTypes.INVITE_NEW_USER:
      return { ...state, invitedUser: action.payload };
    case usersTypes.GET_USER_BY_CONFIRMATION_CODE:
      return { ...state, user: action.payload, isSignedIn: false };
    case usersTypes.USER_NOT_FOUND:
      return { ...state, userNotFound: true };
    case usersTypes.USER_FOUND:
      return { ...state, userNotFound: false, user: action.payload };
    case usersTypes.TOO_MANY_REQUESTS:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        responseMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
