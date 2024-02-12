import axios from "axios";

const entrenamientosApi = axios.create({
  baseURL: "http://localhost:8080/entrenamiento",
});

entrenamientosApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default entrenamientosApi;
