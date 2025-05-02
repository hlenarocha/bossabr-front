import api from "@/api/axiosInstance";

export interface TeamInterface {
  id_equipe: number;
  nome_equipe: string;
}

// interface ApiResponse {
//   success: boolean;
//   data: TeamInterface[];
// }

export const getTeams = async (): Promise<TeamInterface[] | undefined> => {
  try {
    const response = await api.get("/equipe");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// export const getTeamByWorkerId = async (id: number) => {
//   try {
//     const response = await api.get("/equipe");

// }


export default getTeams;