import api from "@/api/axiosInstance";

export interface DailyReportListItem {
  id_pessoa: number;
  first_name: string;
  last_name: string;
  cargo: string;
  nome_equipe: string;
  nome_setor: string;
  total_demandas: number;
  progresso: string;
}

// Interface para a resposta completa da API, incluindo a paginação
export interface PaginatedDailyReportsResponse {
  current_page: number;
  data: DailyReportListItem[];
  last_page: number;
  total: number;
}

/**
 * Busca a lista paginada de diários de todos os colaboradores.
 * @param page - O número da página a ser buscada.
 * @param search - O termo de busca para filtrar os resultados.
 * @returns A resposta paginada da API.
 */
export const readDailyReportsList = async (page: number, search: string): Promise<PaginatedDailyReportsResponse> => {
  try {
    const response = await api.get("/pessoa/listDiarios", {
      params: {
        page: page,
        search: search,
        por_pagina: 10 // Mantendo o padrão de 10 por página
      }
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar lista de diários:", error);
    throw error;
  }
};
