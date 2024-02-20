import axios from "axios";

const testsApi = axios.create({
  baseURL: "http://localhost:8080/test",
});

testsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default testsApi;
