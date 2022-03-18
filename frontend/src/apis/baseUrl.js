const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://syncity.herokuapp.com"
		: "http://localhost:5000";
export default baseUrl;
