import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteServiceById } from "@/api/serviceRoutes";

/**
 * Hook para deletar um serviço.
 */
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteServiceById(id),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
