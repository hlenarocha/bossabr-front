import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { greetingFunction } from "@/utils/greetingFunction";
import { useContext, useEffect, useState } from "react"; // Adicionado useState
import { UserContext } from "@/contexts/UserContext";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import ActivityCard from "@/components/activity/ActivityCard";
import ColoredButton from "@/components/shared/ColoredButton";
import ScoreBar from "@/components/shared/ScoreBar";
import TaskColumn from "@/components/task/TaskColumn";
import { useNavigate } from "react-router-dom";
//import { useDragDrop } from "@/hooks/useDragDrop";
import { Motion } from "@/components/animation/Motion";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import { useReadWorkerDemands } from "@/hooks/worker/useReadWorkerDemands";
import { WorkerDemand } from "@/api/workerRoutes";
import { StatusView } from "@/components/shared/StatusView";
import { readWorkerById, WorkerItem } from "@/api/workerRoutes";

type Task = {
  title: string;
  status: "não iniciada" | "em andamento" | "concluída" | "atrasada";
  indexCard: number;
  prazo: string;
};

const mapStatus = (backendStatus: string): Task["status"] => {
  const status = backendStatus.toLowerCase();
  switch (status) {
    case "novo":
    case "em aprovação":
      return "não iniciada";
    case "em andamento":
      return "em andamento";
    case "concluído":
      return "concluída";
    case "atrasado":
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

  useEffect(() => {
    const fetchWorkerData = async () => {
      if (user?.id_pessoa) {
        try {
          const data = await readWorkerById(user.id_pessoa);
          setWorkerDetails(data);
        } catch (error) {
          console.error("Erro ao buscar detalhes do colaborador na Workspace:", error);
        }
      }
    };
    fetchWorkerData();
  }, [user?.id_pessoa]);


  const [tasks, setTasks] = useState<Task[]>([]);
  const {
    data: workerDemands,
    isLoading,
    isError,
  } = useReadWorkerDemands(user?.id_pessoa);

  // Estado para controlar o filtro de tempo ativo
  const [timeFilter, setTimeFilter] = useState("semana"); // 'semana' como padrão

  useEffect(() => {
    if (workerDemands) {
      const formattedTasks = workerDemands.map((demand: WorkerDemand) => ({
        title: demand.nome_servico,
        status: mapStatus(demand.status),
        indexCard: demand.id_demanda,
        prazo: demand.prazo,
      }));
      setTasks(formattedTasks);
    }
  }, [workerDemands]);

  // const initialTasks = [
  //   { title: "Banner", status: "não iniciada" },
  //   { title: "Post Rosa", status: "em andamento" },
  //   { title: "Post Azul", status: "concluída" },
  //   { title: "Vídeo Legal", status: "atrasada" },
  //   { title: "Cartão", status: "não iniciada" },
  //   { title: "Cartão Rosa", status: "em andamento" },
  //   { title: "Post Lilás", status: "concluída" },
  //   { title: "Post Legal", status: "atrasada" },
  //   { title: "Post Marrom", status: "não iniciada" },
  //   { title: "Banner Legal", status: "em andamento" },
  //   { title: "Outdoor Arte", status: "concluída" },
  //   { title: "Post De Novo", status: "atrasada" },
  //   { title: "Banner De Novo", status: "não iniciada" },
  //   { title: "Banner Legal", status: "em andamento" },
  //   { title: "Banner Legal", status: "em andamento" },
  //   { title: "Banner Legal", status: "em andamento" },
  //   { title: "Banner Legal", status: "em andamento" },
  // ];

  // Usando o hook que gerencia todo o estado de drag and drop
  // const {
  //   tasks,
  //   activeCard,
  //   setActiveCard,
  //   onDrop,
  // } = useDragDrop(initialTasks);

  // Opções e estilos para os botões de filtro
  const filterOptions = [
    {
      value: "hoje",
      label: "Hoje",
      icon: "fa-solid fa-triangle-exclamation",
      baseColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      value: "semana",
      label: "Esta Semana",
      icon: "fa-solid fa-hourglass-half",
      baseColor: "bg-yellow-500",
      textColor: "text-zinc-900",
    },
    {
      value: "mes",
      label: "Este Mês",
      icon: "fa-solid fa-calendar-days",
      baseColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      value: "geral",
      label: "Geral",
      icon: "fa-solid fa-globe",
      baseColor: "bg-zinc-700",
      textColor: "text-white",
    },
  ];

  // estilos para botão de filtro
  const getButtonClass = (
    value: string,
    baseColor: string,
    textColor: string
  ) => {
    const baseClass =
      "font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2";
    if (timeFilter === value) {
      return `${baseClass} ${baseColor} ${textColor} ring-2 ring-offset-2 ring-offset-zinc-900 ring-white`; // Estilo ativo
    }
    return `${baseClass} ${baseColor} ${textColor} opacity-60 hover:opacity-100`; // Estilo inativo
  };

  return (
    <>
      <BaseScreen>
        <div className="w-full flex items-center justify-between cursor-default mt-4">
          <PageTitle title="Área de Trabalho" icon="fa-solid fa-desktop" />

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
              <div className="flex flex-col w-2/3 gap-2">
              {/* Dados atualizados (workerDetails com fallback para contexto (user)) */}
                <InputTitle title="Informações básicas"></InputTitle>
                <div className="flex flex-row gap-2 w-full flex-wrap">
                  <InputString
                    title="NOME"
                    placeholder={`${user?.first_name} ${user?.last_name}` || ""}
                    isMandatory={false}
                    height="h-8"
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                  <InputString
                    title="EQUIPE"
                    placeholder={workerDetails?.nome_equipe || user?.nome_equipe || "Carregando..."}
                    isMandatory={false}
                    height="h-8"
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                </div>
                <div className="flex flex-row gap-2 w-full flex-wrap">
                  <InputString
                    title="SETOR"
                    placeholder={workerDetails?.nome_setor || user?.nome_setor || "Carregando..."}
                    isMandatory={false}
                    height="h-8"
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                  <InputString
                    title="CARGO"
                    placeholder={workerDetails?.cargo || user?.role || "Carregando..."}                    isMandatory={false}
                    height="h-8"
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                </div>
                <div className="flex w-full mt-4 gap-4">
                  <div className="w-1/2">
                    <InputTitle title="Pontuação semanal"></InputTitle>
                    <ScoreBar score={20} />
                  </div>
                  <div className="w-1/2">
                    <InputTitle title="Pontuação mensal"></InputTitle>
                    <ScoreBar score={10} />
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
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                  <ActivityCard
                    width="w-full"
                    title="Pessoa X conclui atividade Y"
                    details="Atividades realizadas nos últimos sete dias."
                  />
                </div>
              </div>
            </div>

            {/* <div className="mt-12">
              <InputTitle title="Filtrar por período"></InputTitle>
             
            </div> */}

            <div className="mt-12 flex flex-col gap-4">
              <InputTitle title="Progresso das demandas"></InputTitle>
              <div className="flex flex-wrap gap-4 mt-2 mb-4">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeFilter(option.value)}
                    className={getButtonClass(
                      option.value,
                      option.baseColor,
                      option.textColor
                    )}
                  >
                    <i className={option.icon}></i>
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-row justify-between w-full gap-4">
                <StatusView
                  isLoading={isLoading}
                  isError={isError}
                  errorMessage="Não foi possível carregar suas demandas."
                >
                  <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
                    {/* drag-and-drop removidas das TaskColumns */}
                    <TaskColumn
                      title="NÃO INICIADAS"
                      tasks={tasks}
                      status="não iniciada"
                    />
                    <TaskColumn
                      title="EM ANDAMENTO"
                      tasks={tasks}
                      status="em andamento"
                    />
                    <TaskColumn
                      title="CONCLUÍDAS"
                      tasks={tasks}
                      status="concluída"
                    />
                    <TaskColumn
                      title="ATRASADAS"
                      tasks={tasks}
                      status="atrasada"
                    />
                  </div>
                </StatusView>
              </div>
            </div>
            <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  navigate(`/diario/${user?.id_pessoa}`);
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
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
