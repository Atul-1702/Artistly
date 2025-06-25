import axiosInstance from "./axios.config";

export const getCategoryData = async () => {
  try {
    const response = await axiosInstance.get("/api/home");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getArtistData = async () => {
  try {
    const response = await axiosInstance.get("/api/artist");
    return response.data;
  } catch (error) {
    return error;
  }
};
