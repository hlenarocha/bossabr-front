import api from "./axiosInstance";

interface FuncionarioData {
  // defines the properties of FuncionarioData here for more security
  first_name: string;
  last_name?: string;
  email: string;
  telefone?: string;
  data_entrada: string;
  data_aniversario: string;
  tema?: boolean;
  avatar?: string;
  role: string;
  id_equipe: number;
}

const createFuncionario = async (data: FuncionarioData) => {
  try {
    const response = await api.post("/funcionario", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default createFuncionario;

