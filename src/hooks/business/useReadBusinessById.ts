import { useQuery } from "@tanstack/react-query";
import { readBusinessById } from "@/api/businessRoutes";

export const useReadBusinessById = (id: number | null) => {
  return useQuery({
    queryKey: ["business", id],
    queryFn: () => readBusinessById(id!), // id não será nulo aqui

    enabled: !!id, // query só executada quando id for não nulo, undefined ou 0
  });
  
}