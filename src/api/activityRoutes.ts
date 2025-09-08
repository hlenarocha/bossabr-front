import api from "@/api/axiosInstance";

// payload da atividade de Design
export interface DesignActivityDTO {
  id_pessoa: number;
  id_demanda: number;
  id_status: number;
  data_inicio: string;
  link_drive?: string;
  observacoes?: string;
}

// payload da atividade de Social Media
export interface SocialMediaActivityDTO {
  id_pessoa: number;
  id_demanda: number;
  id_status: number;
  data_inicio: string;
  texto?: string;
  link_drive?: string;
  observacoes?: string;
}

export interface ActivityDetailsData {
  id_ativ_social_media?: number;
  id_ativ_designer?: number;
  id_demanda: number;
  nome_servico: string;
  data_fim: string;
  data_inicio: string;
  descricao: string;
  nome_empresa: string;
  observacoes: string;
  status: string;
  link_drive?: string;
  texto?: string;
}

// Interface para a resposta da API (supondo que a atividade venha dentro de um objeto 'data')
interface ActivityApiResponse {
    success: boolean;
    data: ActivityDetailsData;
}


export const createDesignActivity = async (payload: DesignActivityDTO) => {
  try {
    const response = await api.post("/atividade", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar atividade de Design:", error);
    throw error;
  }
};

export const createSocialMediaActivity = async (payload: SocialMediaActivityDTO) => {
  try {
    const response = await api.post("/atividade", payload);
    return response.data;
  } catch (error)
  {
    console.error("Erro ao criar atividade de Social Media:", error);
    throw error;
  }
};

export const readActivityById = async (
  type: 'design' | 'social_media',
  id: number
): Promise<ActivityDetailsData> => {
  try {
    // Define o endpoint correto com base no tipo da atividade
    const endpoint = type === 'design' 
      ? `/atividade_design/${id}` 
      : `/atividade_social_media/${id}`;

    const response = await api.get<ActivityApiResponse>(endpoint);
    
    return response.data.data;

  } catch (error) {
    console.error(`Erro ao buscar detalhes da atividade (${type}):`, error);
    throw error;
  }
};

