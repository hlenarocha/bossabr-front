import { useQuery } from "@tanstack/react-query";
import { getBurnoutSensorData } from "@/api/dashboardRoutes";

export const useReadBurnoutSensor = () => {
  return useQuery({
    queryKey: ["burnoutSensor"],
    queryFn: getBurnoutSensorData,
  });
};
