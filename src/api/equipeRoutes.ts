import api from "./axiosInstance";

export const getEquipes = async () => {
  try {
    const response = await api.get("/equipe");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};