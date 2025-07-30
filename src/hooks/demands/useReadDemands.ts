import { readDemands } from "@/api/demandRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadDemands = (page: number, search: string) => {
  return useQuery({
    queryKey: ["demands", page, search],

    queryFn: () => readDemands(page, search),

  });
};
