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

export type PeriodOptions = 'hoje' | '7dias_uteis' | '15dias_uteis' | '30dias_uteis';

export type DemandsByStatus = {
  [status: string]: { 
    id_demanda: number;
    descricao: string;
    prazo: string;
    setor: string;
  }[]; 
};

export const readDemandsByPeriod = async (
  id_pessoa: number,
  dias: PeriodOptions
): Promise<DemandsByStatus> => {
  try {
    const response = await api.get<{ success: boolean; data: DemandsByStatus }>('/demanda/proximos-dias-uteis', {
      params: {
        id_pessoa,
        dias,
      },
    });
    return response.data.data; // A função retorna apenas o objeto 'data'
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
    throw error; // Re-throw the error to ensure the function always returns or throws
  }
}

export default readWorkspace;