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


const readWorkspace = async (id_pessoa: number): Promise<WorkspaceResponse> => {
  try {
    const response = await api.get(`/pessoa/${id_pessoa}/workspace`);
    //   , {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to ensure the function always returns or throws
  }
}

export default readWorkspace;