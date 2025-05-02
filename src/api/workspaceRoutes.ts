import api from "./axiosInstance";

type FuncionarioWorkspace = {
  dadosEssenciais: any[];
  demandas: any[];
}

const readWorkspace = async (id_funcionario: number | undefined): Promise<FuncionarioWorkspace> => {
  try {
    const response = await api.get(`/funcionario/${id_funcionario}/workspace`);
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