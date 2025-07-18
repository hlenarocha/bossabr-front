import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BusinessDTO, updateBusinessById } from "@/api/businessRoutes";

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BusinessDTO }) => updateBusinessById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessList"] });
    }
    
  })
}