import { readDemandById } from "@/api/demandRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadDemandById = (id: number) => {
  return useQuery({
    // A chave inclui o ID para que cada demanda tenha um cache separado
    queryKey: ["demand", id],
    queryFn: () => readDemandById(id),
    // Só executa a query se o ID for um número válido
    enabled: !isNaN(id),
  });
};
