import api from "./axiosInstance";


export interface PendingActivity {
  id_atividade: number;
  id_demanda: number;
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


// ... (suas funções approveActivity e reproveActivity)