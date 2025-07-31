import { deleteDemandById } from "@/api/demandRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDemand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDemandById(id),
    onSuccess: () => {
      // Invalida a lista de demandas para que ela seja atualizada na tela anterior
      queryClient.invalidateQueries({ queryKey: ["demands"] });
    },
  });
};
