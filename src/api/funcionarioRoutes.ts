import api from "./axiosInstance";

interface FuncionarioData {
  // define the properties of FuncionarioData here for more security
  nome: string;
  email: string;
  telefone: string;
  data_entrada: Date;
  data_nascimento: Date;
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

