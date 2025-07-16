import api from "@/api/axiosInstance";

export interface BusinessDTO {
  nome_setor_negocio: string;
}

const createBusiness = async (data: BusinessDTO) => {
  try {
    const response = await api.post("/setorNegocio", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // lança o erro para que possa ser tratado pelo consumidor da função
  }
};

export { createBusiness };