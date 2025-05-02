import api from "@/api/axiosInstance";

export interface TeamInterface {
  id_equipe: number;
  nome_equipe: string;
}

export const getTeams = async (): Promise<TeamInterface[] | undefined> => {
  try {
    const response = await api.get("/equipe");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export default getTeams;