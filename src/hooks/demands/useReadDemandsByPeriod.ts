import { useQuery } from '@tanstack/react-query';
import { readDemandsByPeriod, PeriodOptions, UnifiedDemandResponseData } from '@/api/workspaceRoutes';
import { format } from 'date-fns';

export const useReadDemandsByPeriod = (
  id_pessoa: number | undefined,
  dias: PeriodOptions,
  mes?: Date // O mês é opcional
) => {
  const mesCalendario = mes ? format(mes, 'yyyy-MM') : undefined;

  return useQuery<UnifiedDemandResponseData>({
    queryKey: ['unifiedDemands', id_pessoa, dias, mesCalendario],
    queryFn: () => readDemandsByPeriod(id_pessoa!, dias, mesCalendario),
    enabled: !!id_pessoa,
  });
};