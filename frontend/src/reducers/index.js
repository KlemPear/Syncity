import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import briefsReducer from "./briefsReducer";
import applicationsReducer from "./applicationsReducer";

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	briefs: briefsReducer,
	applications: applicationsReducer,
});
