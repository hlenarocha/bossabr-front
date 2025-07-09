import api from "@/api/axiosInstance";

interface WorkerData {
  // defines the properties of FuncionarioData here for more security
  first_name: string;
  last_name?: string;
  cnpj?: string;
  email: string;
  telefone?: string;
  data_entrada: string;
  data_aniversario: string;
  tema?: boolean;
  avatar?: string;
  role_id: number;
  id_equipe: number;
}

const createWorker = async (data: WorkerData) => {
  try {
    const response = await api.post("/funcionario", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const readWorker = async () => {
  try {
    const response = await api.get("/funcionario");
    return response.data;
  } catch (error) {
    console.error(error);
    }
}

export { createWorker, readWorker };

