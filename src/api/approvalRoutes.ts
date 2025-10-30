import api from "./axiosInstance";
import { getDemandFormData } from "./demandRoutes";


export interface PendingActivity {
  id_atividade: number;
  id_demanda: number;
  id_pessoa: number;
  nome_colaborador: string | null;
  nome_setor: string;
  nome_equipe: string | null;
  data_inicio: string;
  data_fim: string;
  status: string;
  observacoes: string;
  link_drive: string | null;
  tipo: 'Design' | 'Social Media';
  nome_servico?: string;
  descricao_demanda?: string;
}

interface ApprovalActionResponse {
  success: boolean;
  message: string;
}


interface PendingApprovalsResponse {
  success: boolean;
  data: {
    [sectorName: string]: PendingActivity[];
  };
}

/**
 * Função para BUSCAR a lista de todas as atividades pendentes de aprovação.
 * Chama a rota: GET /atividades/pendentes-aprovacao
 */
export const readPendingApprovals = async (): Promise<PendingActivity[]> => {
  try {
    const response = await api.get<PendingApprovalsResponse>('/atividades/pendentes-aprovacao');

    // O backend retorna os dados agrupados por setor, vamos "achatar" em um único array
    const dataBySector = response.data.data;
    const allActivities: PendingActivity[] = [];

    for (const sector in dataBySector) {
      allActivities.push(...dataBySector[sector]);
    }

    // Ordena por data de início, da mais recente para a mais antiga
    allActivities.sort((a, b) => new Date(b.data_inicio).getTime() - new Date(a.data_inicio).getTime());

    return allActivities;
  } catch (error) {
    console.error("Erro ao buscar atividades pendentes de aprovação:", error);
    throw error;
  }
};



/**
 * Função para APROVAR uma atividade específica.
 * Chama a rota: PUT /atividades/{type}/{id}/aprovar
 */
export const approveActivity = async (
  type: 'design' | 'social_media',
  activityId: number,
  newResponsibleId?: number // Parâmetro opcional
): Promise<ApprovalActionResponse> => {
  try {
    const payload = newResponsibleId ? { id_pessoa_responsavel: newResponsibleId } : {};
    const response = await api.put(`/atividades/${type}/${activityId}/aprovar`, payload);
    return response.data;
  } catch (error) {
    console.error(`Erro ao aprovar a atividade #${activityId}:`, error);
    throw error;
  }
};

/**
 * Função para REPROVAR uma atividade específica.
 * Chama a rota: PUT /atividades/{type}/{id}/reprovar
 */
export const reproveActivity = async (
  type: 'design' | 'social_media',
  activityId: number,
  reason: string
): Promise<ApprovalActionResponse> => {
  try {
    const payload = { motivo: reason };
    const response = await api.put(`/atividades/${type}/${activityId}/reprovar`, payload);
    return response.data;
  } catch (error) {
    console.error(`Erro ao reprovar a atividade #${activityId}:`, error);
    throw error;
  }
};

export const concludeActivity = async (
  type: 'design' | 'social_media',
  activityId: number
): Promise<ApprovalActionResponse> => {
  try {
    const response = await api.put(`/atividades/${type}/${activityId}/concluir`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao concluir a atividade #${activityId}:`, error);
    throw error;
  }
};

/**
 * Reutiliza a função de 'demandRoutes' para buscar a lista de pessoas.
 */
export const getPeopleListForApproval = async () => {
  try {
      const data = await getDemandFormData();
      return data.pessoas || []; // Retorna apenas a lista de pessoas
  } catch (error) {
      console.error("Erro ao buscar lista de pessoas:", error);
      throw error;
  }
}