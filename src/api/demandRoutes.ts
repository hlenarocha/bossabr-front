import api from "@/api/axiosInstance";

export interface DemandItem {
  id_demanda: number;
  id_tipo_servico: number;
  id_cliente: number;
  id_pessoa: number;
  id_status: number;
  descricao: string;
  link_drive?: string;
  prazo?: string;
  quantidade: number;
  first_name: string;
  last_name: string;
  status: string;
  nome_servico: string;
} 

export interface DemandDTO {
  id_tipo_servico: number;
  id_pessoa: number;
  id_cliente: number;
  quantidade: number;
  prazo: string;
  descricao?: string;
  link_drive?: string;
  id_status?: number;
}

interface TipoServico {
  id_tipo_servico: number;
  id_setor: number;
  nome_servico: string;
  pontuacao: string; 
}

interface Pessoa {
  id_pessoa: number;
  first_name: string;
}

interface ResponsavelSetor {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  nome_setor: string;
}

interface ResponsavelEquipe {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  nome_equipe: string;
  equipe_interna: boolean;
  nome_setor: string;
}

interface Cliente {
  id_cliente: number;
  nome_empresa: string;
}

interface Status {
  id_status: number;
  status: string;
}

export interface DemandFormDataResponse {
  // success: boolean;
  // message: string;
  tiposServicos: TipoServico[];
  pessoas: Pessoa[];
  responsaveisSetor: ResponsavelSetor[];
  responsaveisEquipe: ResponsavelEquipe[];
  clientes: Cliente[];
  status: Status[];
}

export interface PaginatedDemandsResponse {
  current_page: number;
  data: DemandItem[];
  last_page: number;
  total: number;
}

export const getDemandFormData = async (): Promise<DemandFormDataResponse> => {
  try {
    const response = await api.get("/demanda/form");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do formulário de demanda:", error);
    throw error;
  }
};

const readDemands = async (page: number, search: string): Promise<PaginatedDemandsResponse> => {
  try {
    const response = await api.get("/demanda", {
      params: {
        page: page,
        search: search,
        por_pagina: 10
      }
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar demandas:", error);
    throw error;
  }
};

const getDemands = async (): Promise<DemandItem[] | undefined> => {
  try {
    const response = await api.get("/demanda");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// CREATE
const createDemand = async (data: DemandDTO): Promise<DemandItem> => {
  try {
    const response = await api.post("/demanda", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar demanda:", error);
    throw error; // lança o erro para que possa ser tratado pelo consumidor da função
  }
};

// READ BY ID
const readDemandById = async (id: number): Promise<DemandItem> => {
    try {
        const response = await api.get(`/demanda/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar demanda por ID:", error);
        throw error;
    }
    }
// UPDATE BY ID
const updateDemandById = async (id: number, data: DemandDTO): Promise<DemandItem> => {
    try {
        const response = await api.put(`/demanda/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar demanda:", error);
        throw error;
    }
};


// DELETE BY ID
const deleteDemandById = async (id: number): Promise<void> => {
  try {
    await api.delete(`/demanda/${id}`);
  } catch (error) {
    console.error("Erro ao deletar demanda:", error);
    throw error;
  }
};

export { readDemands, getDemands, createDemand, readDemandById, updateDemandById, deleteDemandById };