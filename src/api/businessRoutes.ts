import api from "@/api/axiosInstance";

export interface BusinessDTO {
  nome_setor_negocio: string;
}

export interface BusinessItem {
  id_setor_negocio: number;
  nome_setor_negocio: string;
}

export interface PaginatedBusinessResponse {
  current_page: number;
  data: BusinessItem[];
  last_page: number;
  total: number;
}
 
// CREATE
const createBusiness = async (data: BusinessDTO) => {
  try {
    const response = await api.post("/setorNegocio", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar setor de negócio:", error);
    throw error; // lança o erro para que possa ser tratado pelo consumidor da função
  }
};

// PAGINATED READ
const readBusiness = async (page: number, search: string): Promise<PaginatedBusinessResponse> => {
  try {
    const response = await api.get("/setorNegocio", {
      params: {
        page: page, 
        search: search, 
        por_pagina: 10
      }
    });
    console.log(response);
    return response.data.data;

  } catch (error) {
    console.error("Erro ao buscar setores de negócio:", error);
    throw error;
  }
}

// READ BY ID
const readBusinessById = async (id: number): Promise<BusinessItem> => {
  const response = await api.get(`/setorNegocio/${id}`);
  return response.data.data;
}

// UPDATE BY ID
const updateBusinessById = async (id: number, data: BusinessDTO) => {
  const response = await api.put(`/setorNegocio/${id}`, data);
  return response.data;
}

// DELETE BY ID
const deleteBusinessById = async (id: number) => {
  const response = await api.delete(`/setorNegocio/${id}`);
  return response.data;
}

export { createBusiness, readBusiness, readBusinessById, updateBusinessById, deleteBusinessById };