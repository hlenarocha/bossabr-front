// hooks e bibliotecas
import { useState } from "react";

// Componentes
import BaseScreen from "../BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { Component } from "@/components/charts/PieChart";
import { Motion } from "@/components/animation/Motion";
import ActivityCard from "@/components/activity/ActivityCard";
import ScoreBar from "@/components/shared/ScoreBar";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import FilterSelect from "@/components/shared/FilterSelect";
import DemandProgress from "@/components/charts/DemandProgress";
import { StatusView } from "@/components/shared/StatusView";

// API, hooks e tipos
import { useReadAuditorias } from "@/hooks/dashboard/useReadAuditorias";
import { AuditPeriod } from "@/api/dashboardRoutes";

const DashboardScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>("geral");
  
  // 1. ESTADO PARA O FILTRO DE PERÍODO DAS ATIVIDADES
  const [activityPeriod, setActivityPeriod] = useState<AuditPeriod>('semana');

  // 2. BUSCA OS DADOS DA AUDITORIA USANDO O NOVO HOOK
  const { data: auditoriaData, isLoading: isLoadingAuditorias, isError: isErrorAuditorias } = useReadAuditorias(activityPeriod);

  const options = [
    { value: "geral", label: "Dashboard Geral" },
    { value: "design", label: "Dashboard Setorial - Design" },
    { value: "social-media", label: "Dashboard Setorial - Social Media" },
  ];
  
  const activityFilterOptions: { label: string, value: AuditPeriod }[] = [
    { label: "Hoje", value: "dia" },
    { label: "Últimos 7 dias", value: "semana" },
    { label: "Últimos 15 dias", value: "15dias" },
  ];

  return (
    <BaseScreen>
      <div className="mt-4">
        <Motion>
          <div className="flex justify-between mb-4 gap-4 ">
            <PageTitle icon="fa-solid fa-chart-pie" marginTop="mt-4" title="Dashboard"></PageTitle>
            <div className="text-white w-1/2">
              <p className="mb-2 text-xl">Dashboard Selecionado:</p>
              <FilterSelect
                options={options}
                value={selectedOption}
                onChange={(value) => setSelectedOption(value)}
              />
            </div>
          </div>

          <div className="flex flex-row w-full gap-4">
            <Box title="Progresso das Demandas" subtitle="Progresso das demandas da agência." height="h-fit" width="w-full">
              <DemandProgress />
            </Box>
          </div>

          <div className="flex flex-row w-full gap-4 mt-4">
            <Box title="Peças Produzidas" subtitle="Visão geral de produtividade semanal e mensal." height="h-fit" width="w-full">
              <Component />
            </Box>

            <Box title="Atividades" subtitle="Auditoria da Agência" width="w-full" height="h-fit">
              {/* 3. BOTÕES DE FILTRO PARA AS ATIVIDADES */}
              <div className="flex justify-end gap-2 mb-4">
                {activityFilterOptions.map(opt => (
                  <button 
                    key={opt.value}
                    onClick={() => setActivityPeriod(opt.value)}
                    className={`py-1 px-3 text-xs rounded-md transition-colors ${activityPeriod === opt.value ? 'bg-customYellow text-black font-bold' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* 4. LISTA DINÂMICA DE ATIVIDADES */}
              <div className="flex flex-col gap-1 h-[330px] overflow-y-auto ">
                <StatusView isLoading={isLoadingAuditorias} isError={isErrorAuditorias} errorMessage="Erro ao carregar atividades.">
                  {auditoriaData?.auditorias && auditoriaData.auditorias.length > 0 ? (
                    auditoriaData.auditorias.map((audit, index) => (
                      <ActivityCard
                        event={audit.evento}
                        key={index}
                        message={audit.mensagem}
                        user={audit.usuario}
                        date={audit.data}
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-500">
                      <p>Nenhuma atividade no período selecionado.</p>
                    </div>
                  )}
                </StatusView>
              </div>
            </Box>
          </div>
          
          <div className="flex flex-row w-full gap-4 mt-4">
            <Box title="Pontuação Acumulada" subtitle="Pontuação acumulada do {setor}." height="h-fit" width="w-full">
              <div className="h-[200px] flex flex-col overflow-y-auto">
                <ScoreBar score={20} />
                <ScoreBar score={10} />
                <ScoreBar score={30} />
              </div>
            </Box>
            <Box title="Setores de Negócio" subtitle="Visão dos setores de negócio dos clientes da agência." height="h-fit" width="w-full">
              <Component />
            </Box>
          </div>
        </Motion>
      </div>
      <ScrollToEndArrow />
    </BaseScreen>
  );
};

export default DashboardScreen;
