import { readBusiness } from "@/api/businessRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadBusiness = (page: number, search: string) => {
  return useQuery({
  
    queryKey: ["businessList", page, search],

    queryFn: () => readBusiness(page, search),

    // // Opção útil: mantém os dados antigos visíveis enquanto os novos carregam,
    // // evitando um "pisca-pisca" na tela.
    // keepPreviousData: true,
  });
};
