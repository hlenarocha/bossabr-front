import api from "@/api/axiosInstance";

// payload
export interface ClientDTO {
  id_setor_negocio: number;
  nome_empresa: string;
  nome_responsavel: string;
  email: string;
  telefone: string;
  data_entrada: string;
  data_fim_contrato: string;
  desc_contrato: string;
  briefing: string;
  ativo: boolean;
  classificacao: string;
}

// response
export interface ClientItem {
  id_cliente: number;
  id_setor_negocio: number;
  nome_empresa: string;
  nome_responsavel: string;
  email: string;
  telefone: string;
  data_entrada: string;
  data_fim_contrato: string;
  desc_contrato: string;
  briefing: string;
  ativo: boolean;
  classificacao: string;
  nome_setor_negocio: string;
}

export interface ClientListItem {
  id_cliente: number; // Essencial que a API retorne este campo
  nome_empresa: string;
  ativo: boolean;
  servicos: string[];
  setores: string[];
  progresso_geral: string;
}



export interface ClientFormDataResponse {
  setoresNegocio: {
    id_setor_negocio: number;
    nome_setor_negocio: string;
  }[];
}



export interface PaginatedClientsResponse {
  current_page: number;
  data: ClientItem[];
  last_page: number;
  total: number;
}

export interface PaginatedClientsListResponse {
  current_page: number;
  data: ClientListItem[];
  last_page: number;
  total: number;
}

// FORM
export const getClientFormData = async (): Promise<ClientFormDataResponse> => {
  try {
    const response = await api.get("/cliente/form");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do formulário de cliente:", error);
    throw error;
  }
};

// READ ALL
const getClients = async (): Promise<ClientItem[]> => {
  try {
    const response = await api.get("/cliente");
    return response.data.data || [];
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

// PAGINATED READ
const readClients = async (page: number, search: string): Promise<PaginatedClientsResponse> => {
  try {
    const response = await api.get("/cliente", {
      params: {
        page: page,
        search: search,
        por_pagina: 10
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

const readClientList = async (page: number, search: string): Promise<PaginatedClientsListResponse> => { 
  try {
    const response = await api.get("/cliente/list", {
      params: {
        page: page,
        search: search,
        por_pagina: 10
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar a lista de clientes:", error);
    throw error;
  }
};



// CREATE
const createClient = async (data: ClientDTO): Promise<any> => {
  try {
    const response = await api.post("/cliente", data);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};

// READ BY ID
const readClientById = async (id: number): Promise<ClientItem> => {
  try {
    const response = await api.get(`/cliente/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar cliente por ID:", error);
    throw error;
  }
};

// UPDATE BY ID
const updateClientById = async (id: number, data: ClientDTO): Promise<any> => {
  try {
    const response = await api.put(`/cliente/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar cliente por ID:", error);
    throw error;
  }
};

// DELETE BY ID
const deleteClientById = async (id: number): Promise<any> => {
  try {
    const response = await api.delete(`/cliente/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar cliente por ID:", error);
    throw error;
  }
}

export { createClient, getClients, readClients, readClientById, updateClientById, deleteClientById, readClientList };