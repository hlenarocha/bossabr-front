import { readWorkerById } from "@/api/workerRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadWorkerById = (id: number) => {
  return useQuery({
    queryKey: ["worker", id],
    queryFn: () => readWorkerById(id),
    // Só executa a query se o ID for um número válido
    enabled: !isNaN(id),
  });
};
