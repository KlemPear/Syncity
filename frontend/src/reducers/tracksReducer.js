import { tracksTypes } from "../actions/types";
import _ from "lodash";

const tracksReducer = (state = {}, action) => {
	switch (action.type) {
		case tracksTypes.FETCH_TRACKS:
			return { ..._.mapKeys(action.payload, "_id") };
		case tracksTypes.CREATE_TRACK:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case tracksTypes.FETCH_TRACK:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case tracksTypes.EDIT_TRACK:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case tracksTypes.DELETE_TRACK:
			return _.omit(state, action.payload._id);
		default:
			return state;
	}
};

export default tracksReducer;
