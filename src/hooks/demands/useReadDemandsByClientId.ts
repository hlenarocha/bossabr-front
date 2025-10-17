import { useQuery } from "@tanstack/react-query";
import { readDemandsByClientId } from "@/api/demandRoutes";

export const useReadDemandsByClientId = (clientId: number, onlyUncompleted: boolean) => {
  return useQuery({
    queryKey: ["demandsByClient", clientId, onlyUncompleted],
    queryFn: () => readDemandsByClientId(clientId, onlyUncompleted),
    enabled: !!clientId, // Só executa se o ID do cliente for válido
  });
};
