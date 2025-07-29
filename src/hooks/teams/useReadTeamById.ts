import { readTeamById } from "@/api/teamRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadTeamById = (id: number) => {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => readTeamById(id),
    // Só executa a query se o ID for um número válido
    enabled: !isNaN(id),
  });
};
