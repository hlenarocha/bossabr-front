import { useQuery } from "@tanstack/react-query";
import { getAuditorias, AuditPeriod } from "@/api/dashboardRoutes";

export const useReadAuditorias = (periodo: AuditPeriod) => {
  return useQuery({
    // A chave da query inclui o período para refazer a busca quando ele mudar
    queryKey: ["auditorias", periodo],
    
    // A função que será executada para buscar os dados
    queryFn: () => getAuditorias(periodo),

    // Mantém os dados antigos visíveis enquanto os novos são carregados
  });
};
