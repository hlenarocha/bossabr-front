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



export interface BurnoutSensorItem {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  pontuacao_total_mes: string; // A API retorna como string, converter para número no frontend
}

export interface PiecesProducedResponse {
  success: boolean;
  message: string;
  quantidade_semanal: number;
  quantidade_mensal: number;
}

export interface ClientsBySectorItem {
  nome_setor_negocio: string;
  total_clientes: number; // A API retorna como número, o que é ótimo
}

export interface SectorScoreItem {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  pontuacao_semanal: number;
  pontuacao_mensal: number;
}
export interface DemandDetailItem {
  id_demanda: number;
  status: string;
  nome_servico: string;
  nome_empresa: string;
  descricao: string;
}

export interface DemandProgressItem {
  status: string;
  total_demandas: number;
  detalhamento: DemandDetailItem[];
}

export type DemandStatusInterval = "mensal" | "quinzenal" | "semanal" | "hoje";

export const getProgressOfDemands = async (intervalo: DemandStatusInterval): Promise<DemandProgressItem[]> => {
  try {
    const response = await api.get(`/demanda/status`, {
      params: { intervalo, detalhado: true }
    }
    );
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


export const getPiecesProduced = async (sectorId: number): Promise<PiecesProducedResponse> => {
  try {
    const response = await api.get(`/setor/${sectorId}/quantidades`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar peças produzidas para o setor ${sectorId}:`, error);
    throw error;
  }
};


export const getClientsByBusinessSector = async (): Promise<ClientsBySectorItem[]> => {
  try {
    const response = await api.get('/cliente/setor_negocio');
    return response.data.data || [];
  } catch (error) {
    console.error("Erro no fetch de clientes por setor de negócio:", error);
    throw error;
  }
};

export const getScoresBySector = async (sectorId: number): Promise<SectorScoreItem[]> => {
  try {
    const response = await api.get(`/pessoa/${sectorId}/pontuacao-setor`);
    // A API retorna um objeto { success: true, pontuacao: [...] }
    return response.data.pontuacao || [];
  } catch (error) {
    console.error(`Erro ao buscar pontuações para o setor ${sectorId}:`, error);
    throw error;
  }
};
