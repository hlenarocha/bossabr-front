import api from "@/api/axiosInstance";

export interface EquipeInterface {
  id_equipe: number;
  nome_equipe: string;
}

interface ApiResponse {
  success: boolean;
  data: EquipeInterface[];
}

export const getEquipes = async (): Promise<ApiResponse | undefined> => {
  try {
    const response = await api.get("/equipe");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getEquipes;