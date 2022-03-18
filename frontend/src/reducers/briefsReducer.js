import { briefsTypes } from "../actions/types";
import _ from "lodash";

const briefsReducer = (state = {}, action) => {
	switch (action.type) {
		case briefsTypes.FETCH_BRIEFS:
			return { ..._.mapKeys(action.payload, "_id") };
		case briefsTypes.CREATE_BRIEF:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case briefsTypes.FETCH_BRIEF:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case briefsTypes.EDIT_BRIEF:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case briefsTypes.DELETE_BRIEF:
			return _.omit(state, action.payload._id);
		default:
			return state;
	}
};

export default briefsReducer;
