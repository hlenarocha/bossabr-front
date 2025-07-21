import api from "@/api/axiosInstance";  
// ATUALIZAR DEPOIS PARA REFLETIR O SCHEMA
export interface ServiceItem {
  id_servico: number;
  nome_servico: string;
  setor_responsavel: string;
  pontuacao: number;
}

export interface ServiceDTO {
  nome_servico: string;
  setor_responsavel: string;
  pontuacao: number;
}

 const getServices = async (): Promise<ServiceItem[] | undefined> => {
  try {
    const response = await api.get("/servico");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// CREATE
 const createService = async (data: ServiceDTO): Promise<ServiceItem> => {
  try {
    const response = await api.post("/servico", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    throw error; // lança o erro para que possa ser tratado pelo consumidor da função
  }
};

// READ BY ID
 const readServiceById = async (id: number): Promise<ServiceItem> => {
  try {
    const response = await api.get(`/servico/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar serviço por ID:", error);
    throw error;
  }
}

// UPDATE BY ID
 const updateServiceById = async (id: number, data: ServiceDTO): Promise<ServiceItem> => {
  try {
    const response = await api.put(`/servico/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    throw error;
  }
};

// DELETE BY ID
 const deleteServiceById = async (id: number): Promise<void> => {
  try {
    await api.delete(`/servico/${id}`);
  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
    throw error;
  }
};

export { getServices, createService, readServiceById, updateServiceById, deleteServiceById };