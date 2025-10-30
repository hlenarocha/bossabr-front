import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveActivity, concludeActivity, reproveActivity } from '@/api/approvalRoutes';

// Interface de variáveis (sem alterações)
interface ApprovalActionVariables {
  action: 'approve' | 'reprove' | 'conclude';
  type: 'design' | 'social_media';
  demandId: number;
  activityId: number;
  reason?: string;
  newResponsibleId?: number;
}

// 1. Interface para as props do hook
interface UseApprovalActionProps {
  onSuccessCallback: (action: 'approve' | 'reprove' | 'conclude') => void;
  onErrorCallback: (error: Error) => void;
}

export const useApprovalAction = ({
  onSuccessCallback,
  onErrorCallback
}: UseApprovalActionProps) => { // 2. Recebe as props
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (variables: ApprovalActionVariables) => {
      const { action, type, activityId, reason, newResponsibleId } = variables;
      if (action === 'reprove') return reproveActivity(type, activityId, reason!);
      if (action === 'conclude') return concludeActivity(type, activityId);
      return approveActivity(type, activityId, newResponsibleId);
    },
    
    // 3. O 'onSuccess' agora faz as DUAS coisas
    onSuccess: (_, variables) => {
      // Ação 1: Invalidar o cache (lógica do hook)
      queryClient.invalidateQueries({ queryKey: ['pendingApprovals'] });
      queryClient.invalidateQueries({ queryKey: ['demandHistory', variables.demandId] });
      queryClient.invalidateQueries({ queryKey: ['unifiedDemands'] });

      // Ação 2: Chamar o callback da UI (lógica do componente)
      onSuccessCallback(variables.action);
    },

    // 4. O 'onError' também chama o callback
    onError: (error) => {
      onErrorCallback(error);
    }
  });
};