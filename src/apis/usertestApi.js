import axios from "axios";

const usertestApi = axios.create({
  baseURL: "http://localhost:8080/usertest",
});

usertestApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default usertestApi;
