import { trackPlayerTypes } from "../actions/types";

const trackPlayerReducer = (state = {}, action) => {
	switch (action.type) {
		case trackPlayerTypes.PLAY_TRACK:
			return action.payload;
		case trackPlayerTypes.CLOSE_TRACK:
			return {};
		default:
			return state;
	}
};

export default trackPlayerReducer;
