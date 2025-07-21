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


// READ ALL
const readClients = async (): Promise<ClientItem[]> => {
  try {
    const response = await api.get("/cliente");
    return response.data.data || [];
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

// CREATE
const createClient = async (data: ClientDTO): Promise<any> => {
  try {
    const response = await api.post("/cliente", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};

// READ BY ID
const readClientById = async (id: number): Promise<ClientItem> => {
  try {
    const response = await api.get(`/cliente/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar cliente por ID:", error);
    throw error;
  }
};

// UPDATE BY ID
const updateClientById = async (id: number, data: ClientDTO): Promise<any> => {
  try {
    const response = await api.put(`/cliente/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar cliente por ID:", error);
    throw error;
  }
};

// DELETE BY ID
const deleteClientById = async (id: number): Promise<any> => {
  try {
    const response = await api.delete(`/cliente/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar cliente por ID:", error);
    throw error;
  }
}

export { createClient, readClients, readClientById, updateClientById, deleteClientById };