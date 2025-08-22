import { useQuery } from "@tanstack/react-query";
import { getScoresBySector } from "@/api/dashboardRoutes";

export const useReadScoresBySector = (sectorId: number | null) => {
  return useQuery({
    queryKey: ["scoresBySector", sectorId],
    queryFn: () => getScoresBySector(sectorId!),
    enabled: !!sectorId, // A query só será ativada se 'sectorId' for um número válido
  });
};
