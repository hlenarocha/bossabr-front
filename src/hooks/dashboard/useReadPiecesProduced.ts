import { useQuery } from "@tanstack/react-query";
import { getPiecesProduced } from "@/api/dashboardRoutes";

export const useReadPiecesProduced = (sectorId: number | null) => {
  return useQuery({
    // A chave da query inclui o ID do setor para refazer a busca quando ele mudar
    queryKey: ["piecesProduced", sectorId],
    
    // A função que será executada
    queryFn: () => getPiecesProduced(sectorId!),

    // A query só será ativada se 'sectorId' for um número válido (não nulo)
    enabled: !!sectorId,
  });
};
