import axios from "axios";
const planApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/plan`,
});

planApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default planApi;
