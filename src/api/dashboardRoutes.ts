import api from "@/api/axiosInstance";

export interface ProgressOfDemandsItem {
  status: string;
  total_demandas: number;
}

export const getProgressOfDemands = async (): Promise<ProgressOfDemandsItem[]> => {
  try {
    const response = await api.get(`/demanda/status`);
    return response.data.data;
  } catch (error) {
    console.error("Erro no fetch de progresso das demandas (dashboard):", error);
    throw error;
  }
}