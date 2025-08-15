import api from "@/api/axiosInstance";

export interface WorkerDTO {
  first_name: string;
  last_name?: string;
  cnpj?: string;
  email: string;
  telefone?: string;
  data_entrada: string;
  data_nascimento: string;
  //avatar?: string;
  id_cargo: number;
  id_equipe: number;
}

export interface WorkerItem {
  id_pessoa: number;
  first_name: string;
  last_name?: string;
  cnpj?: string;
  email: string;
  telefone?: string;
  data_entrada: string;
  data_nascimento: string;
  //avatar?: string;
  id_equipe: number;
  id_cargo: number;
  cargo: number;
  nome_equipe: string;
  nome_setor: string;
}


export interface WorkerFormDataResponse {
  cargos: {
    id_cargo: number;
    cargo: string;
  }[];
  // setores: {
  //   id_setor: number;
  //   nome_setor: string;
  // }[];
  equipes: {
    id_equipe: number;
    nome_equipe: string;
    nome_setor: string;
  }[]
}

export interface PaginatedWorkersResponse {
  current_page: number;
  data: WorkerItem[];
  last_page: number;
  total: number;
}


export interface WorkerDemand {
  id_demanda: number;
  id_pessoa: number;
  nome_servico: string;
  status: string; // Ex: "Novo", "Em andamento", etc.
}

// FORM
export const getWorkerFormData = async (): Promise<WorkerFormDataResponse> => {
  try {
    const response = await api.get("/pessoa/form");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do formulário de pessoa:", error);
    throw error;
  }
};

const createWorker = async (data: WorkerDTO) => {
  try {
    const response = await api.post("/pessoa", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

const getWorkers = async () => {
  try {
    const response = await api.get("/pessoa");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
}

const readWorkers = async (page: number, search: string): Promise<PaginatedWorkersResponse> => {
  try {
    const response = await api.get("/pessoa", {
      params: {
        page: page,
        search: search,
        por_pagina: 10
      }
    });
    console.log(response);

    return response.data.data;

  } catch (error) {
    console.error("Erro ao buscar colaboradores:", error);
    throw error;
  }
};

const readWorkerById = async (id: number): Promise<WorkerItem> => {
  try {
    const response = await api.get(`/pessoa/${id}`);
    console.log(response);
    return response.data.data;

  } catch (error) {
    console.error(error);
    throw error;

  }
};

const updateWorkerById = async (id: number, data: WorkerDTO) => {
  try {
    const response = await api.put(`/pessoa/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

const deleteWorkerById = async (id: number) => {
  try {
    const response = await api.delete(`/pessoa/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

const readWorkerDemands = async (personId: number): Promise<WorkerDemand[]> => {
  try {
    const response = await api.get(`/pessoa/${personId}/demandas`);
    // A API retorna um objeto com uma chave "demandas" contendo o array
    return response.data.demandas || [];
  } catch (error) {
    console.error(`Erro ao buscar demandas para a pessoa ${personId}:`, error);
    throw error;
  }
};



export { createWorker, readWorkers, getWorkers, readWorkerById, updateWorkerById, deleteWorkerById, readWorkerDemands };

