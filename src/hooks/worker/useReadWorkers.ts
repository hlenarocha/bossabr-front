import { readWorkers } from "@/api/workerRoutes";
import { useQuery } from "@tanstack/react-query";

export const useReadWorkers = (page: number, search: string) => {
  return useQuery({
    queryKey: ["workers", page, search],
    queryFn: () => readWorkers(page, search),
  });
};
