import { useQuery } from "@tanstack/react-query";
import { getProgressOfDemands, DemandStatusInterval } from "@/api/dashboardRoutes"; 

export const useReadProgressOfDemands = (intervalo: DemandStatusInterval) => {
  return useQuery({
    queryKey: ["progressOfDemands", intervalo],
    queryFn: () => getProgressOfDemands(intervalo),
    });
};
