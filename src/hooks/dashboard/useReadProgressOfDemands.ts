import { useQuery } from "@tanstack/react-query";
import { getProgressOfDemands } from "@/api/dashboardRoutes"; 

export const useProgressOfDemands = () => {
  return useQuery({
    queryKey: ["progressOfDemands"],
    queryFn: getProgressOfDemands,
  });
};
