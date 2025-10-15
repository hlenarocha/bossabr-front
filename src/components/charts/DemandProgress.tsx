import StatusSphere from "@/components/3D/StatusSphere";
import { DemandProgressItem } from "@/api/dashboardRoutes";

// Adicionada a prop 'onSphereClick'
interface DemandProgressProps {
  apiProgress?: DemandProgressItem[];
  onSphereClick?: (statusData: DemandProgressItem) => void;
}

const DemandProgress = ({ apiProgress, onSphereClick }: DemandProgressProps) => {
  const statusStyles: Record<string, { gradient: string }> = {
    "Não iniciada": { gradient: "from-zinc-400 to-zinc-600" },
    "Em andamento": { gradient: "from-blue-500 to-blue-700" },
    "Em aprovação": { gradient: "from-purple-500 to-purple-700" },
    "Atrasada": { gradient: "from-red-500 to-red-700" },
    "Concluída": { gradient: "from-emerald-500 to-emerald-700" },
  };

  const validStatuses = Object.keys(statusStyles);
  const filteredProgress = apiProgress?.filter(item => validStatuses.includes(item.status));

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-8 p-4 h-full">
      {filteredProgress && filteredProgress.length > 0 ? (
        filteredProgress.map((item) => {
          const hasDetails = item.detalhamento && item.detalhamento.length > 0;
          return (
            <StatusSphere
              key={item.status}
              status={item.status}
              count={item.total_demandas}
              gradient={statusStyles[item.status]?.gradient || "from-gray-500 to-gray-700"}
              // Adicionadas as props para o clique
              onClick={() => hasDetails && onSphereClick && onSphereClick(item)}
              hasDetails={hasDetails}
            />
          );
        })
      ) : (
        <div className="flex items-center justify-center h-full text-zinc-400">
          <p>Nenhum dado de progresso para o período.</p>
        </div>
      )}
    </div>
  );
};

export default DemandProgress;