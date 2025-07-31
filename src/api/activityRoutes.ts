import api from "@/api/axiosInstance";

// payload da atividade de Design
export interface DesignActivityDTO {
  id_demanda: number;
  id_status: number;
  data_inicio: string;
  link_drive?: string;
  observacoes?: string;
}

// payload da atividade de Social Media
export interface SocialMediaActivityDTO {
  id_demanda: number;
  id_status: number;
  data_inicio: string;
  texto?: string;
  link_drive?: string;
  observacoes?: string;
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
