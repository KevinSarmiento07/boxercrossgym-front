import axios from "axios";

const usertestApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/usertest`,
});

usertestApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
  return config;
});

export default usertestApi;
