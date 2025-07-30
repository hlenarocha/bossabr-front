import api from "@/api/axiosInstance";

export interface WorkerDTO {
  first_name: string;
  last_name?: string;
  cnpj?: string;
  email: string;
  telefone?: string;
  data_entrada: string;
  data_aniversario: string;
  //avatar?: string;
  id_cargo: number;
  //id_equipe: number;
}

export interface WorkerItem {
  id_pessoa: number;
  first_name: string;
  last_name?: string;
  cnpj?: string;
  email: string;
  telefone?: string;
  data_entrada: string;
  data_aniversario: string;
  //avatar?: string;
  id_cargo: number;
  //id_equipe: number;
}




const createWorker = async (data: WorkerDTO) => {
  try {
    const response = await api.post("/funcionario", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

const readWorker = async () => {
  try {
    const response = await api.get("/funcionario");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
}

const readWorkerById = async (id: number) => {
  try {
    const response = await api.get(`/funcionario/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

const updateWorkerById = async (id: number, data: WorkerDTO) => {
  try {
    const response = await api.put(`/funcionario/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

const deleteWorkerById = async (id: number) => {
  try {
    const response = await api.delete(`/funcionario/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

export { createWorker, readWorker, readWorkerById, updateWorkerById, deleteWorkerById };

