import api from "@/api/axiosInstance";

// ATUALIZAR DEPOIS PARA REFLETIR O SCHEMA

export interface TeamItem {
  id_equipe: number;
  nome_equipe: string;
  nome_responsavel: string; 
  nome_setor: string;
}

export interface TeamDTO {
  nome_equipe: string;
  id_setor: number;
  responsavel_equipe?: number; // Pode ser opcional
  equipe_interna: boolean;
}

export interface TeamFormDataResponse {
  setores: {
    id_setor: number;
    nome_setor: string;
  }[];
  pessoas: {
    id_pessoa: number;
    first_name: string;
  }[];
}

export interface PaginatedTeamsResponse {
  current_page: number;
  data: TeamItem[];
  last_page: number;
  total: number;
}

 const getTeams = async (): Promise<TeamItem[] | undefined> => {
  try {
    const response = await api.get("/equipe");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const readTeams = async (page: number, search: string): Promise<PaginatedTeamsResponse> => {
  try {
    const response = await api.get("/equipe", {
      params: {
        page: page,
        search: search,
        por_pagina: 10
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar equipes:", error);
    throw error;
  }
};



export const getTeamFormData = async (): Promise<TeamFormDataResponse> => {
  try {
    const response = await api.get("/equipe/form");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do formulário de equipe:", error);
    throw error;
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

export { getTeams, createTeam, readTeamById, updateTeamById, deleteTeamById, readTeams };