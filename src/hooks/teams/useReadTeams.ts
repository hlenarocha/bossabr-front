import { readTeams } from "@/api/teamRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadTeams = (page: number, search: string) => {
  return useQuery({
    queryKey: ["teams", page, search],

    queryFn: () => readTeams(page, search),

  });
};
