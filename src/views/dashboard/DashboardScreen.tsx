// hooks e bibliotecas
import { useState, useMemo, useContext, useEffect } from "react";

// Componentes
import BaseScreen from "../BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
//import { Component } from "@/components/charts/PieChart";
import { Motion } from "@/components/animation/Motion";
import ActivityCard from "@/components/activity/ActivityCard";
import ScoreBar from "@/components/shared/ScoreBar";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import FilterSelect from "@/components/shared/FilterSelect";
import DemandProgress from "@/components/charts/DemandProgress";
import { StatusView } from "@/components/shared/StatusView";

// API, hooks e tipos
import { useReadAuditorias } from "@/hooks/dashboard/useReadAuditorias";
import {
  AuditPeriod,
  BurnoutInterval,
  DemandProgressItem,
  DemandStatusInterval,
  ScoreInterval,
  SectorScoreItem,
} from "@/api/dashboardRoutes";
import BurnoutCard from "@/components/charts/BurnoutCard";
import { useReadBurnoutSensor } from "@/hooks/dashboard/useReadBurnoutSensor";
import { useReadPiecesProduced } from "@/hooks/dashboard/useReadPiecesProduced";
import StatCard from "@/components/charts/StatCard";
import ClientsBySectorChart from "@/components/charts/ClientsBySectorChart";
import { useReadScoresBySector } from "@/hooks/dashboard/useReadScoresBySector";
import { useReadProgressOfDemands } from "@/hooks/dashboard/useReadProgressOfDemands";
import DemandListModal from "@/components/modal/DemandListModal";
import { UserContext } from "@/contexts/UserContext";

const getSectorValueFromUser = (
  userSector: string | undefined
): string | null => {
  if (!userSector) return null;
  const lowerSector = userSector.toLowerCase();
  if (lowerSector.includes("design")) return "design";
  if (lowerSector.includes("social media")) return "social-media";
  return null;
};

const DashboardScreen = () => {
  const { user } = useContext(UserContext);
  const [burnoutPeriod, setBurnoutPeriod] = useState<BurnoutInterval>("mensal");
  const [activityPeriod, setActivityPeriod] = useState<AuditPeriod>("semana");

  console.log(user?.nome_setor)
  const allOptions = [
    { value: "geral", label: "Dashboard Geral" },
    { value: "design", label: "Dashboard Setorial - Design" },
    { value: "social-media", label: "Dashboard Setorial - Social Media" },
  ];

  const [demandProgressPeriod, setDemandProgressPeriod] =
    useState<DemandStatusInterval>("semanal");
  const [scoresPeriod, setScoresPeriod] = useState<ScoreInterval>("mensal");

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedStatusDetails, setSelectedStatusDetails] =
    useState<DemandProgressItem | null>(null);

  const isAdminOrManager =
    user && ["Gerente", "Administrador"].includes(user.role);

  // 7. Crie a lista de opções FILTRADA que o usuário pode ver
  const allowedOptions = useMemo(() => {
    if (isAdminOrManager) {
      return allOptions; // Admins e Gerentes veem tudo
    }
    // Colaboradores veem apenas o seu setor
    const userSectorValue = getSectorValueFromUser(user?.nome_setor);
    return allOptions.filter((opt) => opt.value === userSectorValue);
  }, [user, isAdminOrManager]);

  const [selectedOption, setSelectedOption] = useState<string | null>("geral");

  useEffect(() => {
    // Este efeito define o valor padrão do select assim que o usuário é carregado
    if (user && !selectedOption) {
      if (isAdminOrManager) {
        setSelectedOption("design"); // Padrão para Admins
      } else {
        // Só define o setor do usuário QUANDO o nome_setor estiver disponível
        if (user.nome_setor) {
          setSelectedOption(getSectorValueFromUser(user?.nome_setor));
        }
      }
    }
    if (
      user &&
      !isAdminOrManager &&
      selectedOption === null &&
      user.nome_setor
    ) {
      setSelectedOption(getSectorValueFromUser(user.nome_setor));
    }
  }, [user, selectedOption, isAdminOrManager]); // Depende do usuário estar carregado

  const sectorId = useMemo(() => {
    if (selectedOption === "design") return 1;
    if (selectedOption === "social-media") return 2;
    return null;
  }, [selectedOption]);

  const {
    data: scoresData,
    isLoading: isLoadingScores,
    isError: isErrorScores,
  } = useReadScoresBySector(sectorId, scoresPeriod);
  const {
    data: auditoriaData,
    isLoading: isLoadingAuditorias,
    isError: isErrorAuditorias,
  } = useReadAuditorias(activityPeriod);
  const {
    data: burnoutData,
    isLoading: isLoadingBurnout,
    isError: isErrorBurnout,
  } = useReadBurnoutSensor(sectorId, burnoutPeriod);
  const {
    data: piecesData,
    isLoading: isLoadingPieces,
    isError: isErrorPieces,
  } = useReadPiecesProduced(sectorId);

  const {
    data: demandProgressData,
    isLoading: isLoadingProgress,
    isError: isErrorProgress,
  } = useReadProgressOfDemands(demandProgressPeriod);

  const handleSphereClick = (statusData: DemandProgressItem) => {
    if (statusData.detalhamento && statusData.detalhamento.length > 0) {
      setSelectedStatusDetails(statusData);
      setIsDetailModalOpen(true);
    }
  };

  const activityFilterOptions: { label: string; value: AuditPeriod }[] = [
    { label: "Hoje", value: "dia" },
    { label: "Últimos 7 dias", value: "semana" },
    { label: "Últimos 15 dias", value: "15dias" },
  ];

  // Adicionado: Opções para os novos botões de filtro
  const demandProgressFilterOptions = [
    { label: "Hoje", value: "hoje" },
    { label: "Semanal", value: "semanal" },
    { label: "Quinzenal", value: "quinzenal" },
    { label: "Mensal", value: "mensal" },
  ];

  const burnoutFilterOptions = [
    { label: "Hoje", value: "hoje" },
    { label: "Semanal", value: "semanal" },
    { label: "Quinzenal", value: "quinzenal" },
    { label: "Mensal", value: "mensal" },
  ];

  const scoreFilterOptions = [
    { label: "Hoje", value: "hoje" },
    { label: "Semanal", value: "semanal" },
    { label: "Quinzenal", value: "quinzenal" },
    { label: "Mensal", value: "mensal" },
  ];

  return (
    <>
      <BaseScreen>
        <div className="mt-4">
          <Motion>
            <div className="flex justify-between mb-4 gap-4 ">
              <PageTitle
                icon="fa-solid fa-chart-pie"
                marginTop="mt-4"
                title="Dashboard"
              ></PageTitle>
              <div className="text-white w-1/2">
                <p className="mb-2 text-xl">Dashboard Selecionado:</p>
                <FilterSelect
                  options={allowedOptions}
                  value={selectedOption}
                  onChange={(value) => setSelectedOption(value)}
                  // Desabilita o select se não for admin/gerente
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-4 mt-4">
              <Box
                title="Progresso das Demandas"
                subtitle="Progresso das demandas da agência."
                height="h-[350px] overflow-y-auto"
                width="w-full lg:w-1/2"
              >
                {/* Adicionado: Botões de filtro dentro do Box */}
                <div className="flex justify-end gap-2 mb-4">
                  {demandProgressFilterOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setDemandProgressPeriod(
                          opt.value as DemandStatusInterval
                        )
                      }
                      className={`py-1 px-3 text-xs rounded-md transition-colors ${
                        demandProgressPeriod === opt.value
                          ? "bg-customYellow text-black font-bold"
                          : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="h-[220px]">
                  <StatusView
                    isLoading={isLoadingProgress}
                    isError={isErrorProgress}
                    errorMessage="Erro ao carregar progresso."
                  >
                    <DemandProgress
                      apiProgress={demandProgressData}
                      onSphereClick={handleSphereClick}
                    />
                  </StatusView>
                </div>
              </Box>
              <Box
                title="Peças Produzidas"
                subtitle={
                  selectedOption === "geral"
                    ? "Selecione um setor para ver os dados"
                    : "Visão geral de produtividade."
                }
                height="h-[350px] overflow-y-auto"
                width="w-full lg:w-1/2"
              >
                <StatusView
                  isLoading={isLoadingPieces}
                  isError={isErrorPieces}
                  errorMessage="Erro ao carregar dados."
                >
                  {piecesData ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <StatCard
                        title="Produção Semanal"
                        value={piecesData.quantidade_semanal}
                        icon="fa-solid fa-calendar-week"
                      />
                      <StatCard
                        title="Produção Mensal"
                        value={piecesData.quantidade_mensal}
                        icon="fa-solid fa-calendar-days"
                      />
                    </div>
                  ) : (
                    <div className="text-center text-zinc-400 p-8 h-[138px] flex items-center justify-center">
                      <p>
                        {selectedOption === "geral"
                          ? "Selecione um dashboard setorial acima."
                          : "Carregando dados..."}
                      </p>
                    </div>
                  )}
                </StatusView>
              </Box>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-4 mt-4">
              <Box
                title="Atividades"
                subtitle="Auditoria da agência."
                width="w-full lg:w-1/2"
                height="h-[550px] overflow-y-auto"
              >
                <div className="flex justify-end gap-2 mb-4">
                  {activityFilterOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setActivityPeriod(opt.value)}
                      className={`py-1 px-3 text-xs rounded-md transition-colors ${
                        activityPeriod === opt.value
                          ? "bg-customYellow text-black font-bold"
                          : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-1 h-full overflow-y-auto ">
                  <StatusView
                    isLoading={isLoadingAuditorias}
                    isError={isErrorAuditorias}
                    errorMessage="Erro ao carregar atividades."
                  >
                    {auditoriaData?.auditorias &&
                    auditoriaData.auditorias.length > 0 ? (
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
                      <div className="flex items-center justify-center h-full text-zinc-300">
                        <p>Nenhuma atividade no período selecionado.</p>
                      </div>
                    )}
                  </StatusView>
                </div>
              </Box>
              <Box
                title="Setores de Negócio"
                subtitle="Visão dos setores de negócio dos clientes da agência."
                height="h-[550px] overflow-y-auto"
                width="w-full lg:w-1/2"
              >
                <ClientsBySectorChart />
              </Box>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4 mt-4">
              <Box
                title="Sensor de Burnout"
                subtitle="Controle de carga prevista dos colaboradores."
                width="w-full lg:w-1/2"
              >
                {/* Adicionado: Botões de filtro */}
                <div className="flex justify-end gap-2 mb-4 flex-shrink-0">
                  {burnoutFilterOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setBurnoutPeriod(opt.value as BurnoutInterval)
                      }
                      className={`py-1 px-3 text-xs rounded-md transition-colors ${
                        burnoutPeriod === opt.value
                          ? "bg-customYellow text-black font-bold"
                          : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Conteúdo do Box */}
                <div className="flex-grow h-[300px] overflow-y-auto">
                  <StatusView
                    isLoading={isLoadingBurnout}
                    isError={isErrorBurnout}
                    errorMessage="Erro ao carregar dados de burnout."
                  >
                    <div className="flex flex-row flex-wrap gap-4 p-4">
                      {burnoutData?.map((person) => (
                        <BurnoutCard
                          key={person.id_pessoa}
                          name={`${person.first_name} ${person.last_name}`}
                          // Alterado: Usa a nova propriedade da API
                          score={Number(person.pontuacao_total_intervalo) || 0}
                        />
                      ))}
                    </div>
                  </StatusView>
                </div>
              </Box>

              <Box
                title="Pontuação Acumulada"
                subtitle={
                  selectedOption === "geral"
                    ? "Selecione um setor"
                    : `Colaboradores do setor (${scoresPeriod})`
                }
                width="w-full lg:w-1/2"
              >
                {/* Adicionado: Botões de filtro */}
                <div className="flex justify-end gap-2 mb-4 flex-shrink-0">
                  {scoreFilterOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setScoresPeriod(opt.value as ScoreInterval)
                      }
                      className={`py-1 px-3 text-xs rounded-md transition-colors ${
                        scoresPeriod === opt.value
                          ? "bg-customYellow text-black font-bold"
                          : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="flex-grow h-[300px] overflow-y-auto pr-2">
                  <StatusView
                    isLoading={isLoadingScores}
                    isError={isErrorScores}
                    errorMessage="Erro ao carregar pontuações."
                  >
                    {scoresData && scoresData.length > 0 ? (
                      scoresData.map((person: SectorScoreItem) => (
                        <div key={person.id_pessoa} className="mb-4">
                          <p className="text-white font-semibold text-sm mb-1">
                            {person.first_name} {person.last_name}
                          </p>
                          <ScoreBar
                            score={person.pontuacao}
                            maxScore={person.pontuacao_meta || 100} // Ensure accessing the first item's meta score
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-500">
                        <p>
                          {selectedOption === "geral"
                            ? "Selecione um dashboard setorial."
                            : "Nenhuma pontuação encontrada."}
                        </p>
                      </div>
                    )}
                  </StatusView>
                </div>
              </Box>
            </div>
          </Motion>
        </div>
        <ScrollToEndArrow />
      </BaseScreen>
      {isDetailModalOpen && selectedStatusDetails && (
        <DemandListModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          statusTitle={selectedStatusDetails.status}
          demands={selectedStatusDetails.detalhamento}
        />
      )}{" "}
    </>
  );
};

export default DashboardScreen;
