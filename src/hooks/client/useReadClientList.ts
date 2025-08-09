import { useQuery } from "@tanstack/react-query";
import { readClientList } from "@/api/clientRoutes";

export const useReadClientList = (search: string) => {
  return useQuery({
    queryKey: ["clientList"], // A busca será tratada no 'select'
    queryFn: readClientList,
    // O 'select' permite transformar ou filtrar os dados após a busca
    select: (data) => {
      if (!search) {
        return data; // Retorna todos os dados se não houver busca
      }
      const lowercasedSearch = search.toLowerCase();
      // Filtra no frontend
      return data.filter(client => 
        client.nome_empresa.toLowerCase().includes(lowercasedSearch)
      );
    },
  });
};
