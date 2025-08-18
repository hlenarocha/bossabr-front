import { useQuery } from "@tanstack/react-query";
import { readClientList } from "@/api/clientRoutes";

// O hook agora aceita a página e a busca
export const useReadClientList = (page: number, search: string) => {
  return useQuery({
    // A chave da query agora inclui a página para buscar novamente quando ela mudar
    queryKey: ["clientList", page, search],
    queryFn: () => readClientList(page, search),
   // keepPreviousData: true, // Mantém os dados antigos visíveis enquanto carrega os novos
  });
};
