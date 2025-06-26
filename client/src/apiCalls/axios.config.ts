import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://artistly-wheat.vercel.app",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
