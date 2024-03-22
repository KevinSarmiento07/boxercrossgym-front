import axios from "axios";

const bookingsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/booking`,
});

bookingsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default bookingsApi;
