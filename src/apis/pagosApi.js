import axios from "axios";

const pagosApi = axios.create({
  baseURL: "http://localhost:8080/pago",
});

pagosApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default pagosApi;
