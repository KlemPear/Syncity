import axios from "axios";
import baseUrl from "./baseUrl";
axios.defaults.withCredentials = true;

export default axios.create({
	baseURL: baseUrl + "/notifications",
	headers: { originverification: "800d0df5-7b35-45c2-b862-0493bd703c24" },
});
