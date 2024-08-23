import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export default axiosConfig;