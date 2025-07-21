import api from "@/api/axiosInstance";

// payload
export interface ClientDTO {
  id_setor_negocio: number;
  nome_empresa: string;
  nome_responsavel: string;
  email: string;
  telefone: string;
  data_entrada: string;
  data_fim_contrato: string;
  desc_contrato: string;
  briefing: string;
  ativo: boolean;
  classificacao: string;
}

// response
export interface ClientItem {
  id_cliente: number;
  id_setor_negocio: number;
  nome_empresa: string;
  nome_responsavel: string;
  email: string;
  telefone: string;
  data_entrada: string;
  data_fim_contrato: string;
  desc_contrato: string;
  briefing: string;
  ativo: boolean;
  classificacao: string;
}


export const readClients = async (): Promise<ClientItem[]> => {
  try {
    const response = await api.get("/cliente");
    return response.data.data || []; 
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

export const createClient = async (data: ClientDTO): Promise<any> => {
  try {
    const response = await api.post("/cliente", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};
