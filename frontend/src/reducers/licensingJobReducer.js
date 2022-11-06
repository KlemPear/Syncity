import { licensingJobsTypes, usersTypes } from "../actions/types";
import _ from "lodash";

const licensinJobsReducer = (state = {}, action) => {
	switch (action.type) {
		case licensingJobsTypes.FETCH_LICENSINGJOBS:
			return { ..._.mapKeys(action.payload, "_id") };
		case licensingJobsTypes.CREATE_NOTIFICATION:
			return {
				...state,
			};
		case licensingJobsTypes.FETCH_LICENSINGJOB:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case licensingJobsTypes.EDIT_LICENSINGJOB:
			return {
				...state,
				[action.payload._id]: action.payload,
			};
		case licensingJobsTypes.DELETE_LICENSINGJOB:
			return _.omit(state, action.payload._id);
		case usersTypes.LOGOUT_USER:
			return {};
		default:
			return state;
	}
};

export default licensinJobsReducer;
