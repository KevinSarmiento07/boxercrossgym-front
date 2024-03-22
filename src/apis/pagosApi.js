import axios from "axios";

const pagosApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/pago`,
});

pagosApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default pagosApi;
