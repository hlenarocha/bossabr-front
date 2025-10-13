import { Pie, PieChart, Cell, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { StatusView } from "@/components/shared/StatusView";
import { useReadClientsBySector } from "@/hooks/dashboard/useReadClientsBySector";

const ClientsBySectorChart = () => {
  const { data: chartData, isLoading, isError } = useReadClientsBySector();

  return (
    <Card className="flex flex-col bg-transparent border-none text-white shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Clientes por setor</CardTitle>
        <CardDescription className="text-zinc-400">Distribuição dos clientes por setores de negócio.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <StatusView isLoading={isLoading} isError={isError} errorMessage="Erro ao carregar dados.">
          <div className="w-full h-[250px] flex items-center justify-center">
            <PieChart width={250} height={250}>
              <Tooltip
                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                contentStyle={{ 
                  backgroundColor: '#a5a5a5',
                  borderColor: '#F6BC0A', 
                  borderRadius: '0.5rem',
                  color: 'white'
                }}
              />
              <Pie
                data={chartData}
                dataKey="total_clientes"
                nameKey="nome_setor_negocio"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                cornerRadius={5}
              >
                {/* --- LÓGICA DE COR ATUALIZADA --- */}
                {/* Agora, a cor é baseada na posição (index) do item na lista, */}
                {/* garantindo uma distribuição visualmente distinta. */}
                {chartData?.map((_, index) => {
                  const hue = (index * 137.5) % 360; // Usa o "ângulo de ouro" para espaçar as cores
                  const color = `hsl(${hue}, 70%, 55%)`;
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Pie>
            </PieChart>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm">
            {chartData?.map((entry, index) => {
              const hue = (index * 137.5) % 360;
              const color = `hsl(${hue}, 70%, 55%)`;
              return (
                <div key={`legend-${index}`} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-zinc-300">{entry.nome_setor_negocio} ({entry.total_clientes})</span>
                </div>
              );
            })}
          </div>
        </StatusView>
      </CardContent>
    </Card>
  );
}

export default ClientsBySectorChart;
