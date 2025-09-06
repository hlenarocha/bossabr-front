import { useQuery } from '@tanstack/react-query';
// Alterado: Importa o novo tipo DemandsByStatus em vez de FilteredData
import { readDemandsByPeriod, PeriodOptions, DemandsByStatus } from '@/api/workspaceRoutes';

export const useReadDemandsByPeriod = (id_pessoa: number | undefined, dias: PeriodOptions) => {
  return useQuery<DemandsByStatus>({
    queryKey: ['demandsByPeriod', id_pessoa, dias],
    queryFn: () => readDemandsByPeriod(id_pessoa!, dias),
    enabled: !!id_pessoa,
  });
};