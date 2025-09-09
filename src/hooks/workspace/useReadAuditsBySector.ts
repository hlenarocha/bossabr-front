import { useQuery } from '@tanstack/react-query';
import { readAuditsBySector } from '@/api/workspaceRoutes';

// Alterado: O hook agora só recebe o ID do setor
export const useReadAuditsBySector = (sectorId: number | undefined) => {
  return useQuery({
    // Alterado: A chave da query foi simplificada
    queryKey: ['auditsBySector', sectorId],
    queryFn: () => readAuditsBySector(sectorId!),
    enabled: !!sectorId,
  });
};