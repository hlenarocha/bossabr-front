import { useQuery } from "@tanstack/react-query";
import { readWorkerDemands } from "@/api/workerRoutes";

export const useReadWorkerDemands = (personId: number | undefined) => {
  return useQuery({
    queryKey: ["workerDemands", personId],
    
    // A função que será executada para buscar os dados
    queryFn: () => readWorkerDemands(personId!), // O '!' garante que a função só rode se personId existir

    // A query só será ativada se 'personId' for um número válido (não undefined)
    enabled: !!personId,
  });
};
