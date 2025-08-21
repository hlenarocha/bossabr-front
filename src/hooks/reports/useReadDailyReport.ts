import { useQuery } from "@tanstack/react-query";
import { postDailyReport } from "@/api/reportRoutes";

export const useReadDailyReport = (personId: number | undefined, date: string) => {
  return useQuery({
    // A chave da query inclui o ID da pessoa e a data para refazer a busca quando mudarem
    queryKey: ["dailyReport", personId, date],
    
    // A função que será executada para buscar os dados
    queryFn: () => postDailyReport(personId!, date),

    // A query só será ativada se 'personId' for um número válido
    enabled: !!personId,
  });
};
