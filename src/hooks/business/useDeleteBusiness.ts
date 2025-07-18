import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBusinessById } from "@/api/businessRoutes";

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBusinessById(id),
    onSuccess: () => {
      // invalida lista após delete
      queryClient.invalidateQueries({ queryKey: ["businessList"] }); 
    }
  })
}