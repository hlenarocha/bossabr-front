import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBusiness, BusinessDTO } from "@/api/businessRoutes";

// callbacks
interface UseCreateBusinessOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateBusiness = (options?: UseCreateBusinessOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: BusinessDTO) => createBusiness(data),
    onSuccess: () => {
      // invalida query da lista para que seja atualizada
      queryClient.invalidateQueries({ queryKey: ["businessList"] });
      // chama callback de sucesso se existir
      options?.onSuccess?.();
    },

    onError: (error: Error) => {
      // chama callback de erro se existir
      options?.onError?.(error);
    },
  });

  return mutation;
}