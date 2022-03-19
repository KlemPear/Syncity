import { applicationsTypes } from "../actions/types";
import _ from "lodash";

const briefsReducer = (state = {}, action) => {
	switch (action.type) {
		case applicationsTypes.FETCH_APPLICATIONS:
			return { ..._.mapKeys(action.payload, "_id") };
		case applicationsTypes.CREATE_APPLICATION:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case applicationsTypes.FETCH_APPLICATION:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case applicationsTypes.EDIT_APPLICATION:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case applicationsTypes.DELETE_APPLICATION:
			return _.omit(state, action.payload._id);
		default:
			return state;
	}
};

export default briefsReducer;
