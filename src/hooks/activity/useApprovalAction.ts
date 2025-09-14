import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveActivity, reproveActivity } from '@/api/approvalRoutes';

// Define os tipos de variáveis que a nossa mutação pode receber
interface ApprovalActionVariables {
  action: 'approve' | 'reprove';
  type: 'design' | 'social_media';
  activityId: number;
  reason?: string;
}

export const useApprovalAction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (variables: ApprovalActionVariables) => {
      const { action, type, activityId, reason } = variables;

      if (action === 'approve') {
        return approveActivity(type, activityId);
      } else {
        // A verificação 'reason!' garante ao TypeScript que 'reason' existirá aqui
        return reproveActivity(type, activityId, reason!);
      }
    },
    // Quando a mutação for bem-sucedida, invalide a query da lista de pendências
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingApprovals'] });
    }
  });
};