import { readBusiness } from "@/api/businessRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadBusiness = () => {
  return useQuery({

    // mesma key do useCreateBusiness
    queryKey: ["businessList"],

    // função que busca dados
    queryFn: readBusiness,
  });

}