import { deleteTeamById } from "@/api/teamRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTeamById(id),
    onSuccess: () => {
      // Invalida a lista de equipes para que ela seja atualizada na tela anterior
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
};
