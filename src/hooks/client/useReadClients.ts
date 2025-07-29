import { readClients } from "@/api/clientRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadClients = (page: number, search: string) => {
  return useQuery({
    queryKey: ["clients", page, search],

    queryFn: () => readClients(page, search),

  });
};
