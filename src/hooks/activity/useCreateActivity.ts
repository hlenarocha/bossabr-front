import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  createDesignActivity, 
  createSocialMediaActivity,
  DesignActivityDTO,
  SocialMediaActivityDTO
} from "@/api/activityRoutes";

type ActivityPayload = DesignActivityDTO | SocialMediaActivityDTO;
type ActivityType = 'design' | 'social_media';

export const useCreateActivity = (activityType: ActivityType) => {
  const queryClient = useQueryClient();

  const mutationFn = (payload: ActivityPayload) => {
    if (activityType === 'design') {
      return createDesignActivity(payload as DesignActivityDTO);
    }
    return createSocialMediaActivity(payload as SocialMediaActivityDTO);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      // Invalida as queries de demandas para que as telas sejam atualizadas com os novos dados
      queryClient.invalidateQueries({ queryKey: ['demands'] });
      queryClient.invalidateQueries({ queryKey: ['workerDemands'] });
      // Você pode adicionar um toast de sucesso aqui se desejar
      console.log("Atividade registrada com sucesso!");
    },
    onError: (error) => {
      console.error("Falha ao registrar atividade:", error);
      // Aqui você pode mostrar um toast de erro
    },
  });
};
