import { deleteWorkerById } from "@/api/workerRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteWorker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteWorkerById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
    },
  });
};
