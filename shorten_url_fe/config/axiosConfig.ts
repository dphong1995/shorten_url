import axios from "axios";

const NODE_ENV = process.env.NODE_ENV;

const ENV_API_URL: Record<typeof NODE_ENV, string> = {
  production: "https://phong-shorten-url.herokuapp.com",
  test: "https://phong-shorten-url.herokuapp.com",
  development:
    typeof window !== "undefined" ? "http://localhost:3000" : "http://be:3000",
};

axios.defaults.baseURL = ENV_API_URL[NODE_ENV];
