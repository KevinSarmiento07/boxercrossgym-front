import axios from "axios";

const exercisesApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/exercises`,
});

exercisesApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default exercisesApi;
