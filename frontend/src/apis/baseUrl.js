const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://app.nost.audio"
		: "http://localhost:5000";
export default baseUrl;
