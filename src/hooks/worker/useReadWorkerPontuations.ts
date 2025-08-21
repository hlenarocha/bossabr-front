import { useQuery } from "@tanstack/react-query";
import { readWorkerPontuationsById } from "@/api/workerRoutes";

export const useReadWorkerPontuations = (personId: number | undefined) => {
  return useQuery({
    // A chave da query inclui o ID da pessoa para buscar os dados corretos
    queryKey: ["workerPontuations", personId],
    
    // A função que será executada para buscar os dados
    queryFn: () => readWorkerPontuationsById(personId!),

    // A query só será ativada se 'personId' for um número válido
    enabled: !!personId,
  });
};
