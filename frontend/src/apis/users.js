import axios from "axios";
import baseUrl from "./baseUrl";

axios.defaults.withCredentials = true;

export default axios.create({
	baseURL: baseUrl + "/users",
});
