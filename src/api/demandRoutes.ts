import api from "@/api/axiosInstance";
// ATUALIZAR DEPOIS PARA REFLETIR O SCHEMA E OS ATRIBUTOS DO BACK

export interface DemandItem {
  id_demanda: number;
  serviceId: number;
  clientId: number;
  statusId: number;
  description: string;
  driveLink?: string;
  deadline?: string;
  quantity?: number;
  sectorId: number;
}

export interface DemandDTO {
  serviceId: number;
  clientId: number;
  statusId: number;
  description: string;
  driveLink?: string;
  deadline?: string;
  quantity?: number;
  sectorId: number;
}

const getDemands = async (): Promise<DemandItem[] | undefined> => {
  try {
    const response = await api.get("/demanda");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// CREATE
const createDemand = async (data: DemandDTO): Promise<DemandItem> => {
  try {
    const response = await api.post("/demanda", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar demanda:", error);
    throw error; // lança o erro para que possa ser tratado pelo consumidor da função
  }
};

// READ BY ID
const readDemandById = async (id: number): Promise<DemandItem> => {
    try {
        const response = await api.get(`/demanda/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar demanda por ID:", error);
        throw error;
    }
    }
// UPDATE BY ID
const updateDemandById = async (id: number, data: DemandDTO): Promise<DemandItem> => {
    try {
        const response = await api.put(`/demanda/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar demanda:", error);
        throw error;
    }
};


// DELETE BY ID
const deleteDemandById = async (id: number): Promise<void> => {
  try {
    await api.delete(`/demanda/${id}`);
  } catch (error) {
    console.error("Erro ao deletar demanda:", error);
    throw error;
  }
};

export { getDemands, createDemand, readDemandById, updateDemandById, deleteDemandById };