import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://besirad.basirahtv.com/api",
  withCredentials: true,
});

export default axiosInstance;
