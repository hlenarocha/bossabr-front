import api from "@/api/axiosInstance";

export type AuditPeriod = 'dia' | 'semana' | '15dias';

export interface AuditoriaItem {
  mensagem: string;
  data: string; 
  usuario: string;
  evento: string;
  tabela: string;
  dados_novos: object;
  dados_antigos: object;
}

export interface AuditoriaResponse {
  success: boolean;
  auditorias: AuditoriaItem[];
}


export interface ProgressOfDemandsItem {
  status: string;
  total_demandas: number;
}

export interface BurnoutSensorItem {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  pontuacao_total_mes: string; // A API retorna como string, converter para número no frontend
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar auditorias para o período "${periodo}":`, error);
    throw error;
  }
};

export const getBurnoutSensorData = async (): Promise<BurnoutSensorItem[]> => {
  try {
    const response = await api.get('/demanda/sensor_burnout');
    // A API retorna o array de dados diretamente
    return response.data;
  } catch (error) {
    console.error("Erro no fetch do sensor de burnout:", error);
    throw error;
  }
};
