import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "artistly-9f10mpnjn-atul-kumars-projects-dc1fbddd.vercel.app",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
