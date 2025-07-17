import api from "@/api/axiosInstance";

export interface BusinessDTO {
  nome_setor_negocio: string;
}

export interface BusinessItem {
  id_setor_negocio: number;
  nome_setor_negocio: string;
}

const createBusiness = async (data: BusinessDTO) => {
  try {
    const response = await api.post("/setorNegocio", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar setor de negócio:", error);
    throw error; // lança o erro para que possa ser tratado pelo consumidor da função
  }
};

const readBusiness = async () => {
  try {
    const response = await api.get("/setorNegocio");
    return response.data.data;

  } catch (error) {
    console.error("Erro ao buscar setores de negócio:", error);
    throw error;
  }

}

export { createBusiness, readBusiness };