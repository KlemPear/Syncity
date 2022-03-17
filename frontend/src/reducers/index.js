import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import briefsReducer from "./briefsReducer";

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	briefs: briefsReducer,
});
