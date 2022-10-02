import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import briefsReducer from "./briefsReducer";
import applicationsReducer from "./applicationsReducer";
import tracksReducer from "./tracksReducer";
import trackPlayerReducer from "./trackPlayerReducer";
import notificationsReducer from "./notificationsReducer";

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	briefs: briefsReducer,
	applications: applicationsReducer,
	tracks: tracksReducer,
	trackPlayer: trackPlayerReducer,
	notifications: notificationsReducer,
});
