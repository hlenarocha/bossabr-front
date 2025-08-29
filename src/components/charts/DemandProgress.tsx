import { StatusView } from "@/components/shared/StatusView";
import StatusSphere from "@/components/3D/StatusSphere";
import { useProgressOfDemands } from "@/hooks/dashboard/useReadProgressOfDemands";

// 1. Tipos para os 5 status que vêm do backend
type BackendStatus =
  | "Não iniciada"
  | "Em andamento"
  | "Em aprovação"
  | "Concluída"
  | "Atrasada"
  // | "Em execução"
  // | "Enviada para aprovação"
  // | "Aprovada"
  // | "Reprovada";

const DemandProgress = () => {
  // 2. Busca os dados reais da API usando o hook
  const { data: apiProgress, isLoading, isError } = useProgressOfDemands();

  // 3. Mapeamento de estilos. REVER STATUS
  const statusStyles: Record<BackendStatus, { gradient: string }> = {
    "Não iniciada": { gradient: "from-gray-500 to-zinc-700" },
    "Em andamento": { gradient: "from-blue-500 to-blue-700" },
    "Concluída": { gradient: "from-green-500 to-green-700" },
    "Em aprovação": { gradient: "from-purple-500 to-purple-700" },
    "Atrasada": { gradient: "from-red-500 to-red-700" },

    // "Em execução": { gradient: "from-cyan-500 to-cyan-700" },
    // "Reprovada": { gradient: "from-rose-500 to-rose-700" },
    // "Enviada para aprovação": { gradient: "from-orange-500 to-orange-700" },
    // "Aprovada": { gradient: "from-green-500 to-green-700" },
  };

  const validStatuses = Object.keys(statusStyles);

  // Filtra os dados da API para incluir APENAS os status válidos
  const filteredProgress = apiProgress?.filter((item) => 
    validStatuses.includes(item.status)
  );

  return (
    <StatusView isLoading={isLoading} isError={isError} errorMessage="Não foi possível carregar o progresso.">
      <div className="flex flex-row flex-wrap items-center justify-center gap-8 p-4">
        {/* 4. Renderiza as 5 esferas diretamente a partir dos dados da API */}
        {filteredProgress?.map((item) => (
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
