const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://app.nost.audio"
    : process.env.NODE_ENV === "staging"
    ? "https://syncity-staging.herokuapp.com/"
    : "http://localhost:8080";
export default baseUrl;
