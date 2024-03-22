import axios from "axios";

const testsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/test`,
});

testsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default testsApi;
