import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://besirad.basirahtv.com/api",
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default axiosInstance;
