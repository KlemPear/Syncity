import { notificationsTypes } from "../actions/types";
import _ from "lodash";

const notificationsReducer = (state = {}, action) => {
	switch (action.type) {
		case notificationsTypes.FETCH_NOTIFICATIONS:
			return { ..._.mapKeys(action.payload, "_id") };
		case notificationsTypes.CREATE_NOTIFICATION:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case notificationsTypes.FETCH_NOTIFICATION:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case notificationsTypes.EDIT_NOTIFICATION:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case notificationsTypes.DELETE_NOTIFICATION:
			return _.omit(state, action.payload._id);
		default:
			return state;
	}
};

export default notificationsReducer;
