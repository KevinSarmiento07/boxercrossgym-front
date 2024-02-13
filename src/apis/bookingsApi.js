import axios from "axios";

const bookingsApi = axios.create({
  baseURL: "http://localhost:8080/booking",
});

bookingsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default bookingsApi;
