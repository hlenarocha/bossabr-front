import { useQuery } from "@tanstack/react-query";
import { readDailyReportsList } from "@/api/reportRoutes";

export const useReadDailyReportsList = (page: number, search: string) => {
  return useQuery({
    // A chave da query inclui a página e a busca para que o React Query
    // refaça a busca automaticamente quando esses valores mudarem.
    queryKey: ["dailyReportsList", page, search],
    
    // A função que será executada para buscar os dados.
    queryFn: () => readDailyReportsList(page, search),

  });
};
