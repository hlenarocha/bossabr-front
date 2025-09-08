import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { greetingFunction } from "@/utils/greetingFunction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import ActivityCard from "@/components/activity/ActivityCard";
import ColoredButton from "@/components/shared/ColoredButton";
import ScoreBar from "@/components/shared/ScoreBar";
import TaskColumn from "@/components/task/TaskColumn";
import { useNavigate } from "react-router-dom";
import { Motion } from "@/components/animation/Motion";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import { useReadDemandsByPeriod } from "@/hooks/demands/useReadDemandsByPeriod"; // Hook atualizado
import { PeriodOptions } from "@/api/workspaceRoutes"; // Tipos simplificados
import { StatusView } from "@/components/shared/StatusView";
import { readWorkerById, WorkerItem } from "@/api/workerRoutes";
import FilterButtonGroup, {
  FilterOption,
} from "@/components/shared/FilterButtonGroup";
import { useReadWorkerPontuations } from "@/hooks/worker/useReadWorkerPontuations";
import Toast from "@/components/shared/Toast";
import CreateActivityModal from "../activities/CreateActivityModal";

type Task = {
  title: string;
  status:
    | "não iniciada"
    | "em andamento"
    | "concluída"
    | "em aprovação"
    | "atrasada";
  indexCard: number;
  prazo: string;
};

const mapStatus = (backendStatus: string): Task["status"] => {
  switch (backendStatus.toLowerCase()) {
    case "não iniciada":
      return "não iniciada";
    case "em aprovação":
      return "em aprovação";
    case "em andamento":
      return "em andamento";
    case "concluída":
      return "concluída";
    case "atrasada":
      return "atrasada";
    default:
      return "não iniciada";
  }
};

const WorkspaceScreen = () => {
  const greeting = greetingFunction();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [workerDetails, setWorkerDetails] = useState<WorkerItem | null>(null);

  const { data: pontuationsData } = useReadWorkerPontuations(user?.id_pessoa);

  const [selectedDemand, setSelectedDemand] = useState<Task | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleActionClick = (event: React.MouseEvent, task: Task) => {
    event.stopPropagation();
    if (task.status !== "concluída") {
      setSelectedDemand(task);
      setIsModalOpen(true);
    } else {
      navigate(`/demandas/${task.indexCard}`);
    }
  };

  const inferActivityType = (sectorName: string): "design" | "social_media" => {
    return sectorName.toLowerCase().includes("design")
      ? "design"
      : "social_media";
  };

  const handleSetToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    const fetchWorkerData = async () => {
      if (user?.id_pessoa) {
        try {
          const data = await readWorkerById(user.id_pessoa);
          setWorkerDetails(data);
        } catch (error) {
          console.error(
            "Erro ao buscar detalhes do colaborador na Workspace:",
            error
          );
        }
      }
    };
    fetchWorkerData();
  }, [user?.id_pessoa]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [timeFilter, setTimeFilter] = useState<PeriodOptions>("7dias_uteis");

  const {
    data: filteredDemandsData,
    isLoading,
    isError,
  } = useReadDemandsByPeriod(user?.id_pessoa, timeFilter);

  // useEffect para processar e achatar os dados da nova API
  useEffect(() => {
    if (filteredDemandsData) {
      const allTasks: Task[] = [];

      for (const status in filteredDemandsData) {
        const demandsForStatus = filteredDemandsData[status];

        const formattedTasks = demandsForStatus.map((demand) => ({
          title: demand.descricao,
          status: mapStatus(status),
          indexCard: demand.id_demanda,
          prazo: demand.prazo,
        }));

        allTasks.push(...formattedTasks);
      }
      setTasks(allTasks);
    } else {
      setTasks([]);
    }
  }, [filteredDemandsData]);

  const filterOptions: FilterOption[] = [
    {
      value: "hoje",
      label: "Hoje",
      icon: "fa-solid fa-triangle-exclamation",
      baseColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      value: "7dias_uteis",
      label: "7 Dias",
      icon: "fa-solid fa-hourglass-half",
      baseColor: "bg-yellow-500",
      textColor: "text-zinc-900",
    },
    {
      value: "15dias_uteis",
      label: "15 Dias",
      icon: "fa-solid fa-calendar-check",
      baseColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      value: "30dias_uteis",
      label: "30 Dias",
      icon: "fa-solid fa-binoculars",
      baseColor: "bg-zinc-700",
      textColor: "text-white",
    },
  ];

  return (
    <>
      <BaseScreen>
        <div className="w-full flex items-center justify-between cursor-default mt-4">
          <PageTitle title="Área de trabalho" icon="fa-solid fa-desktop" />

          <div
            onClick={() => navigate("/configuracoes")}
            className="flex items-center hover:bg-zinc-900 hover:cursor-pointer gap-4 bg-black/20 backdrop-blur-sm rounded-[20px] p-2 pr-6 shadow-md"
          >
            <div className="w-20 h-20 flex justify-center items-center bg-white bg-opacity-50 rounded-full shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)]">
              <img
                className="rounded-full w-16 h-16"
                src={user?.url_avatar}
                alt={`Avatar de ${user?.first_name}`}
              />
            </div>

            <p className="text-white font-bold text-2xl">
              {user?.first_name} {user?.last_name}
            </p>
          </div>
        </div>
        <Motion>
          <Box
            title={`${greeting}, ${user?.first_name}!`}
            subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
            width="w-full"
            height="h-fit"
          >
            <div className="flex w-full flex-row gap-8 mt-8 ">
              <div className="flex flex-col w-full gap-2 mr-4">
                {/* Dados atualizados (workerDetails com fallback para contexto (user)) */}
                <InputTitle title="Informações básicas"></InputTitle>
                <div className="flex flex-row gap-2 w-full">
                  <InputString
                    title="NOME"
                    placeholder={`${user?.first_name} ${user?.last_name}` || ""}
                    isMandatory={false}
                    height="h-8"
                    width="w-1/4"
                    isReadOnly={true}
                  ></InputString>
                  <InputString
                    title="EQUIPE"
                    placeholder={
                      workerDetails?.nome_equipe ||
                      user?.nome_equipe ||
                      "Carregando..."
                    }
                    isMandatory={false}
                    height="h-8"
                    width="w-1/4"
                    isReadOnly={true}
                  ></InputString>
                  <InputString
                    title="SETOR"
                    placeholder={
                      workerDetails?.nome_setor ||
                      user?.nome_setor ||
                      "Carregando..."
                    }
                    isMandatory={false}
                    height="h-8"
                    width="w-1/4"
                    isReadOnly={true}
                  ></InputString>
                  <InputString
                    title="CARGO"
                    placeholder={
                      workerDetails?.cargo || user?.role || "Carregando..."
                    }
                    isMandatory={false}
                    height="h-8"
                    width="w-1/4"
                    isReadOnly={true}
                  ></InputString>
                </div>

                <div className="flex w-full mt-4 gap-4">
                  <div className="w-1/2">
                    <InputTitle title="Pontuação semanal"></InputTitle>
                    <ScoreBar
                      score={pontuationsData?.pontuacaoSemanal ?? 0}
                      maxScore={100}
                    />
                  </div>
                  <div className="w-1/2">
                    <InputTitle title="Pontuação mensal"></InputTitle>
                    <ScoreBar
                      score={pontuationsData?.pontuacaoMensal ?? 0}
                      maxScore={100}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-1/3">
                <InputTitle title="Atividades"></InputTitle>
                <div className="text-sm mt-2 mb-2">
                  Auditoria da Equipe - Hoje
                </div>
                <div className="flex flex-col gap-1 h-[200px] overflow-y-auto ">
                  <ActivityCard
                    // width="w-full"
                    event={"atualizou"}
                    key={1}
                    message={"Fulano atualizou cliente Superhipermercado"}
                    user={"Fulano"}
                    date={"20/02/2002"}
                  />
                </div>
              </div>
            </div>

            {/* <div className="mt-12">
              <InputTitle title="Filtrar por período"></InputTitle>
             
            </div> */}

            <div className="mt-4 flex flex-col gap-4">
              <InputTitle title="Progresso das demandas"></InputTitle>
              <div className="mb-4">
                <FilterButtonGroup
                  options={filterOptions}
                  selectedValue={timeFilter}
                  onFilterChange={(value) =>
                    setTimeFilter(value as PeriodOptions)
                  }
                />
              </div>
              <div className="flex flex-row justify-between w-full gap-4">
                <StatusView
                  isLoading={isLoading}
                  isError={isError}
                  errorMessage="Não foi possível carregar suas demandas."
                >
                  <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
                    <TaskColumn
                      title="NÃO INICIADAS"
                      tasks={tasks}
                      status="não iniciada"
                      onCardActionClick={handleActionClick}
                    />
                    <TaskColumn
                      title="EM ANDAMENTO"
                      tasks={tasks}
                      status="em andamento"
                      onCardActionClick={handleActionClick}
                    />
                    <TaskColumn
                      title="EM APROVAÇÃO"
                      tasks={tasks}
                      status="em aprovação"
                      onCardActionClick={handleActionClick}
                    />
                    <TaskColumn
                      title="CONCLUÍDAS"
                      tasks={tasks}
                      status="concluída"
                      onCardActionClick={handleActionClick}
                    />
                    <TaskColumn
                      title="ATRASADAS"
                      tasks={tasks}
                      status="atrasada"
                      onCardActionClick={handleActionClick}
                    />
                  </div>
                </StatusView>
              </div>
            </div>
            <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  navigate(`/diarios/${user?.id_pessoa}`);
                }}
                title="VISUALIZAR DIÁRIO"
                width="w-[60%]"
                icon="fa-solid fa-eye"
                color="customYellow"
                justify="justify-center"
              ></ColoredButton>
            </div>
          </Box>
        </Motion>
        <ScrollToEndArrow />
        {isModalOpen && selectedDemand && (
          <CreateActivityModal
            navigateToOnSuccess="/area-trabalho"
            demandId={selectedDemand.indexCard}
            activityType={inferActivityType(user?.nome_setor || "")}
            onClose={() => setIsModalOpen(false)}
            setToast={handleSetToast}
          />
        )}
        {toastMessage && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage(null)}
          />
        )}
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
