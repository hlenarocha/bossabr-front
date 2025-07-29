import { deleteClientById } from "@/api/clientRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteClientById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
