import { readServices } from "@/api/serviceRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadServices = (page: number, search: string) => {
  return useQuery({
    queryKey: ["services", page, search],

    queryFn: () => readServices(page, search),

  });
};
