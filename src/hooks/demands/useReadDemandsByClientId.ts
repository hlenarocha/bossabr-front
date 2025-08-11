import { useQuery } from "@tanstack/react-query";
import { readDemandsByClientId } from "@/api/demandRoutes";

export const useReadDemandsByClientId = (clientId: number) => {
  return useQuery({
    queryKey: ["demandsByClient", clientId],
    queryFn: () => readDemandsByClientId(clientId),
    enabled: !!clientId, // Só executa se o ID do cliente for válido
  });
};
