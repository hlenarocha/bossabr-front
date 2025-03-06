import api from "./axiosInstance";

interface FuncionarioData {
  // defines the properties of FuncionarioData here for more security
  nome: string;
  email: string;
  telefone: string;
  data_entrada: string;
  data_nascimento: string;
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

