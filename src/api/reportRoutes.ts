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

export interface DailyReportActivity {
  id_ativ_designer?: number;
  id_ativ_social_media?: number;
  id_demanda: number;
  nome_servico: string;
  data_inicio: string;
  data_fim: string | null;
  descricao: string | null;
  observacoes: string | null;
  id_status: number;
  status: string;
  nome_empresa: string;
}

// Interface para a resposta completa da API
export interface DailyReportResponse {
  success: boolean;
  ativ_social_media: DailyReportActivity[];
  ativ_design: DailyReportActivity[];
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

export const postDailyReport = async (personId: number, date: string): Promise<DailyReportResponse> => {
  try {
    // 1. Crie um objeto com os dados a serem enviados no corpo da requisição.
    const payload = {
      id: personId,
      data: date,
    };

    // 2. Passe o 'payload' como o segundo argumento da função api.post().
    const response = await api.post(`/pessoa/relatorio`, payload);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar relatório diário:", error);
    throw error;
  }
}