const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://app.nost.audio"
		: "http://localhost:8080";
export default baseUrl;
