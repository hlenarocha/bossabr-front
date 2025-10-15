import { useQuery } from "@tanstack/react-query";
import { getScoresBySector, ScoreInterval } from "@/api/dashboardRoutes";

export const useReadScoresBySector = (sectorId: number | null, intervalo: ScoreInterval) => {
  return useQuery({
    queryKey: ["scoresBySector", sectorId, intervalo],
    queryFn: () => getScoresBySector(sectorId!, intervalo),
    enabled: !!sectorId, // A query só será ativada se 'sectorId' for um número válido
  });
};
