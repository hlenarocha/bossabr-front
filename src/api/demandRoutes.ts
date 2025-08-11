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
  nome_cliente: string;
  nome_setor?: string;
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


// HISTÓRICO DE DEMANDAS
interface HistoryPessoa {
  id_pessoa: number;
  first_name: string;
  last_name?: string;
}

interface HistoryStatus {
  id_status: number;
  status: string;
}

interface HistorySetor {
  id_setor: number;
  nome_setor: string;
}

interface HistoryEquipe {
  id_equipe: number;
  nome_equipe: string;
  setor: HistorySetor;
}

interface HistoryEquipePessoa {
  id_equipe_pessoa: number;
  equipe: HistoryEquipe;
}

interface AtividadeDesignerHistoryItem {
  id_ativ_designer: number;
  data_inicio: string;
  observacoes: string | null;
  link_drive: string | null;
  pessoa: HistoryPessoa;
  status: HistoryStatus;
  equipe_pessoa: HistoryEquipePessoa;
}

interface AtividadeSocialMediaHistoryItem {
  id_ativ_social_media: number;
  data_inicio: string;
  texto: string | null;
  observacoes: string | null;
  link_drive: string | null;
  pessoa: HistoryPessoa;
  status: HistoryStatus;
  equipe_pessoa: HistoryEquipePessoa;
}

export interface DemandHistoryResponse {
  id_demanda: number;
  atividades_designer: AtividadeDesignerHistoryItem[];
  atividades_social_media: AtividadeSocialMediaHistoryItem[];
}

export interface DemandByClientItem {
  nome_empresa: string;
  nome_servico: string;
  status: string;
  nome_setor: string;
  descricao: string;
  prazo: string;
  // Adicione um ID para a key do React, a API precisa retornar isso
  id_demanda: number; 
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

export const readDemandHistory = async (id: number): Promise<DemandHistoryResponse> => {
  try {
    const response = await api.get(`/demanda/historico/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao buscar histórico da demanda ${id}:`, error);
    throw error;
  }
};

export const readDemandsByClientId = async (clientId: number): Promise<DemandByClientItem[]> => {
  try {
    // A API que você mencionou é /demanda/historico/:id, mas o nome da rota no seu
    // controller de demanda é /demanda/cliente/:id. Estou usando a segunda opção.
    const response = await api.get(`/demanda/cliente/${clientId}`);
    // O seu JSON de exemplo não tem a chave "data" aninhada, então acessamos direto.
    // Se a API real tiver, mude para: return response.data.data;
    // O nome da empresa é a chave principal no seu JSON, então precisamos extrair o array de dentro dela.
    const clientName = Object.keys(response.data).find(key => key !== 'success');
    return clientName ? response.data[clientName] : [];

  } catch (error) {
    console.error(`Erro ao buscar demandas para o cliente ${clientId}:`, error);
    throw error;
  }
};


export { readDemands, getDemands, createDemand, readDemandById, updateDemandById, deleteDemandById };