import { briefsTypes } from "../actions/types";
import _ from "lodash";

const briefsReducer = (state = {}, action) => {
	switch (action.type) {
		case briefsTypes.FETCH_BRIEFS:
			return { ..._.mapKeys(action.payload, "_id") };
		case briefsTypes.CREATE_BRIEF:
			return {
				...state,
				briefs: action.payload,
			};
		default:
			return state;
	}
};

export default briefsReducer;
