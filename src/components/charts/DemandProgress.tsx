import { StatusView } from "@/components/shared/StatusView";
import StatusSphere from "@/components/3D/StatusSphere";
import { useProgressOfDemands } from "@/hooks/dashboard/useReadProgressOfDemands";

// 1. Tipos para os 5 status que vêm do backend
type BackendStatus = "Novo" | "Em andamento" | "Concluído" | "Atrasado" | "Em aprovação";

const DemandProgress = () => {
  // 2. Busca os dados reais da API usando o hook
  const { data: apiProgress, isLoading, isError } = useProgressOfDemands();

  // 3. Mapeamento de estilos para CADA UM dos 5 status
  const statusStyles: Record<BackendStatus, { gradient: string }> = {
    "Novo": { gradient: "from-purple-500 to-purple-700" },
    "Em andamento": { gradient: "from-blue-500 to-blue-700" },
    "Em aprovação": { gradient: "from-yellow-500 to-yellow-700" }, // Nova cor para este status
    "Concluído": { gradient: "from-green-500 to-green-700" },
    "Atrasado": { gradient: "from-red-500 to-red-700" },
  };

  return (
    <StatusView isLoading={isLoading} isError={isError} errorMessage="Não foi possível carregar o progresso.">
      <div className="flex flex-row flex-wrap items-center justify-center gap-8 p-4">
        {/* 4. Renderiza as 5 esferas diretamente a partir dos dados da API */}
        {apiProgress?.map((item) => (
          <StatusSphere
            key={item.status}
            status={item.status}
            count={item.total_demandas}
            gradient={statusStyles[item.status as BackendStatus].gradient}
          />
        ))}
      </div>
    </StatusView>
  );
};

export default DemandProgress;
