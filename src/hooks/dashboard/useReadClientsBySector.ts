import { useQuery } from "@tanstack/react-query";
import { getClientsByBusinessSector } from "@/api/dashboardRoutes";

export const useReadClientsBySector = () => {
  return useQuery({
    queryKey: ["clientsBySector"],
    queryFn: getClientsByBusinessSector,
  });
};
