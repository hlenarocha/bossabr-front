import { readClientById } from "@/api/clientRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadClientById = (id: number) => {
  return useQuery({
    queryKey: ["client", id],
    queryFn: () => readClientById(id),
    // só executa a query se o ID for um número válido
    enabled: !isNaN(id),
  });
};
