import api from "@/api/axiosInstance";
// ATUALIZAR DEPOIS PARA REFLETIR O SCHEMA
// id_tipo_servico	integer
// example: 1
// id_setor*	integer
// example: 1
// nome_servico*	string
// maxLength: 200
// example: Banner
// pontuacao	number($float)
// example: 2
// nullable: true
// }

export interface ServiceItem {
  id_tipo_servico: number;
  id_setor: number;
  nome_servico: string;
  nome_setor: string;
  pontuacao: number | null;
  created_at: string;
  updated_at: string;
}


export interface ServiceForm {
  setores: {
    id_setor: number;
    nome_setor: string;
  }[];
}

export interface ServiceDTO {
  id_setor: number;
  nome_servico: string;
  pontuacao: number | null;
}

export interface PaginatedServicesResponse {
  current_page: number;
  data: ServiceItem[];
  last_page: number;
  total: number;
}

const readServices = async (page: number, search: string): Promise<PaginatedServicesResponse> => {
  try {
    const response = await api.get("/tipoServico", {
      params: {
        por_pagina: 10,
        page: page,
        search: search
      }
    });

    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    throw error;
  }
};


// CREATE
const createService = async (data: ServiceDTO): Promise<ServiceItem> => {
  try {
    const response = await api.post("/tipoServico", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    throw error; // lança o erro para que possa ser tratado pelo consumidor da função
  }
};

// READ BY ID
const readServiceById = async (id: number): Promise<ServiceItem> => {
  try {
    const response = await api.get(`/tipoServico/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar serviço por ID:", error);
    throw error;
  }
}

// UPDATE BY ID
const updateServiceById = async (id: number, data: ServiceDTO): Promise<ServiceItem> => {
  try {
    const response = await api.put(`/tipoServico/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    throw error;
  }
};

// DELETE BY ID
const deleteServiceById = async (id: number): Promise<void> => {
  try {
    await api.delete(`/tipoServico/${id}`);
  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
    throw error;
  }
};

const getServiceFormData = async (): Promise<ServiceForm> => {
  try {
    const response = await api.get("/tipoServico/form");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do formulário de serviço:", error);
    throw error;
  }
}

export { readServices, createService, readServiceById, updateServiceById, deleteServiceById, getServiceFormData };