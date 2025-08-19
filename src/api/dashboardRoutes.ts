import api from "@/api/axiosInstance";

export type AuditPeriod = 'dia' | 'semana' | '15dias';

// Interface para um item individual da lista de auditoria
export interface AuditoriaItem {
  mensagem: string;
  data: string; // ex: "01/06/2024 14:30"
  usuario: string;
  evento: string;
  tabela: string;
  dados_novos: object;
  dados_antigos: object;
}

// Interface para a resposta completa da API
export interface AuditoriaResponse {
  success: boolean;
  auditorias: AuditoriaItem[];
}


export interface ProgressOfDemandsItem {
  status: string;
  total_demandas: number;
}

export const getProgressOfDemands = async (): Promise<ProgressOfDemandsItem[]> => {
  try {
    const response = await api.get(`/demanda/status`);
    return response.data.data;
  } catch (error) {
    console.error("Erro no fetch de progresso das demandas (dashboard):", error);
    throw error;
  }
}

export const getAuditorias = async (periodo: AuditPeriod): Promise<AuditoriaResponse> => {
  try {
    const response = await api.get('/auditorias', {
      params: {
        periodo: periodo,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar auditorias para o período "${periodo}":`, error);
    throw error;
  }
};
