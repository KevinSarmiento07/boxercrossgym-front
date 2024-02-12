import axios from "axios";

const clasesApi = axios.create({
  baseURL: "http://localhost:8080/clase",
});

clasesApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: sessionStorage.getItem("token"),
  };
});

export default clasesApi;
