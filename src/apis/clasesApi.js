import axios from "axios";

const clasesApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/clase`,
});

clasesApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default clasesApi;
