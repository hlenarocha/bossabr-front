import { useQuery } from '@tanstack/react-query';
import { readPendingApprovals } from '@/api/approvalRoutes';

export const useReadPendingApprovals = () => {
  return useQuery({
    queryKey: ['pendingApprovals'],
    queryFn: readPendingApprovals,
  });
};