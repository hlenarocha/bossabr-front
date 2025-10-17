import api from "./axiosInstance";


export interface DadosEssenciaisInterface {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  nome_equipe: string;
  nome_setor: string;
}

export interface DemandaInterface {
  id_demanda: number;
  id_pessoa: number;
  nome_servico: string;
  status: string;
}

export interface WorkspaceResponse {
  dadosEssenciais: DadosEssenciaisInterface;
  demandas: DemandaInterface[];
  pontuacao_pessoa_semanal: number;
  pontuacao_pessoa_mensal: number;
}

export interface AuditItem {
  evento: string;
  mensagem: string;
  usuario: string;
  data: string;
  tabela: string;
  dados_novos: object;
  dados_antigos: object;
}

export interface AuditResponse {
  auditorias: AuditItem[];
}

export type PeriodOptions = 'hoje' | '7dias_uteis' | '15dias_uteis' | '30dias_uteis';

export interface DemandItem {
  id_demanda: number;
  descricao: string;
  prazo: string;
  setor: string;
  status_demanda: string; // Importante para o mapeamento de status do calendário
  status_ultima_atividade: string | null;
  nome_empresa?: string; // Opcional, mas útil
}


export type DemandsByStatus = {
  [status: string]: DemandItem[];
};

export interface UnifiedDemandResponseData {
  demandasFiltradas: DemandsByStatus;
  demandasCalendario: DemandsByStatus;
}

export const readAuditsBySector = async (
  sectorId: number
): Promise<AuditResponse> => {
  try {
    const response = await api.get(`/auditorias/setor/${sectorId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar auditorias para o setor ${sectorId}:`, error);
    throw error;
  }
};

export const readDemandsByPeriod = async (
  id_pessoa: number,
  dias: PeriodOptions,
  mes_calendario: string | undefined // Aceita ser opcional
): Promise<UnifiedDemandResponseData> => {
  try {
    // ALTERAÇÃO: Monta o objeto de parâmetros garantindo que todos sejam incluídos
    const params = {
      id_pessoa,
      dias,
      mes_calendario,
    };

    const response = await api.get<{ success: boolean; data: UnifiedDemandResponseData }>('/demanda/proximos-dias-uteis', { params });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar demandas por período:", error);
    throw error;
  }
};


const readWorkspace = async (id_pessoa: number): Promise<WorkspaceResponse> => {
  try {
    const response = await api.get(`/pessoa/${id_pessoa}/workspace`);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default readWorkspace;