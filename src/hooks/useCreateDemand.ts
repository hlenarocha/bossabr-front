import { useResourceMutation } from "@/hooks/useResourceMutation";
import { createDemand, DemandDTO } from "@/api/demandRoutes";

export const useCreateDemand = () => {
  return useResourceMutation<DemandDTO>({
    mutationFn: ({ payload }) => createDemand(payload),
    
    successToastMessage: "Demanda cadastrada com sucesso!",
    successNavigationRoute: "/demandas", 
    errorModalMessage: "Não foi possível cadastrar a demanda. Verifique os dados e tente novamente.",
  });
};
