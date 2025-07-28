import { useQuery } from "@tanstack/react-query";
import { readServiceById } from "@/api/serviceRoutes";

/**
 * Hook para buscar um único serviço pelo seu ID.
 * @param serviceId - O ID do serviço a ser buscado.
 */
export const useReadServiceById = (serviceId: number | null) => {
  return useQuery({
    queryKey: ["service", serviceId],
    
    queryFn: () => readServiceById(serviceId!),
    
    enabled: !!serviceId,
  });
};
