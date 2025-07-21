import api from "@/api/axiosInstance";

// ATUALIZAR DEPOIS PARA REFLETIR O SCHEMA

export interface TeamItem {
  id_equipe: number;
  nome_equipe: string;
}

export interface TeamDTO {
  nome_equipe: string;
}

 const getTeams = async (): Promise<TeamItem[] | undefined> => {
  try {
    const response = await api.get("/equipe");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// CREATE
 const createTeam = async (data: TeamDTO): Promise<TeamItem> => {
  try {
    const response = await api.post("/equipe", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar equipe:", error);
    throw error; // lança o erro para que possa ser tratado pelo consumidor da função
  }
};

// READ BY ID
 const readTeamById = async (id: number): Promise<TeamItem> => {
  try {
    const response = await api.get(`/equipe/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar equipe por ID:", error);
    throw error;
  }
}

// UPDATE BY ID
 const updateTeamById = async (id: number, data: TeamDTO): Promise<TeamItem> => {
  try {
    const response = await api.put(`/equipe/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar equipe:", error);
    throw error;
  }
};

// DELETE BY ID
 const deleteTeamById = async (id: number): Promise<void> => {
  try {
    await api.delete(`/equipe/${id}`);
  } catch (error) {
    console.error("Erro ao deletar equipe:", error);
    throw error;
  }
};

export { getTeams, createTeam, readTeamById, updateTeamById, deleteTeamById };