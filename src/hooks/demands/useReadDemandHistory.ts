import { useQuery } from "@tanstack/react-query";
import { readDemandHistory } from "@/api/demandRoutes";

export const useReadDemandHistory = (demandId: number) => {
  return useQuery({
    queryKey: ["demandHistory", demandId],
    queryFn: () => readDemandHistory(demandId),
    enabled: !!demandId, // A query só será executada se o demandId for um valor válido
  });
};
