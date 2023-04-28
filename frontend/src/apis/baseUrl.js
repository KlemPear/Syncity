// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://app.nost.audio"
//     : process.env.NODE_ENV === "staging"
//     ? "https://syncity-staging.herokuapp.com"
//     : "http://localhost:8080";
let baseUrl = "";
switch(process.env.NODE_ENV) {
	case "production":
		baseUrl = "https://app.nost.audio";
		break;
	case "staging":
		baseUrl = "https://syncity-staging.herokuapp.com";
		break;
	default:
		baseUrl = "http://localhost:8080";
}
export default baseUrl;
