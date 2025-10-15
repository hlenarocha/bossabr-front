import { useQuery } from '@tanstack/react-query';
import { getBurnoutSensorData, BurnoutInterval } from '@/api/dashboardRoutes'; // Supondo que a função e o tipo estão em dashboardRoutes

export const useReadBurnoutSensor = (
  sectorId: number | null, 
  intervalo: BurnoutInterval
) => {
  return useQuery({
    queryKey: ['burnoutSensor', sectorId, intervalo],
    queryFn: () => getBurnoutSensorData(sectorId, intervalo),
    enabled: !!intervalo,
  });
};