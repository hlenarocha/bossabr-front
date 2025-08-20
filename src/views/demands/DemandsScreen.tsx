// hooks e bibliotecas
import { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import ColoredButton from "@/components/shared/ColoredButton";
import TaskColumn from "@/components/task/TaskColumn";
import TaskCard from "@/components/task/TaskCard";
import { Calendar } from "@/components/ui/calendar";
import { Motion } from "@/components/animation/Motion";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import { StatusView } from "@/components/shared/StatusView";

// API, hooks e tipos
import { UserContext } from "@/contexts/UserContext";
import { useReadWorkerDemands } from "@/hooks/worker/useReadWorkerDemands"; // Usando o mesmo hook da Workspace
import { WorkerDemand } from "@/api/workerRoutes";
import CreateActivityModal from "../activities/CreateActivityModal";
import FilterButtonGroup, { FilterOption } from "@/components/shared/FilterButtonGroup";

// Interface para as tarefas do Kanban
interface Task {
  title: string;
  status: "não iniciada" | "em andamento" | "concluída" | "atrasada";
  indexCard: number;
  prazo: string;
}

// Função para mapear o status do backend para o status do frontend
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

const DemandsScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Pega o usuário logado

  // --- BUSCA DE DADOS DA API (AGORA IGUAL À WORKSPACE) ---
  const { 
    data: workerDemands, 
    isLoading, 
    isError 
  } = useReadWorkerDemands(user?.id_pessoa);

    // --- ESTADO PARA O MODAL E TAREFAS ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedDemand, setSelectedDemand] = useState<Task | null>(null);


    const handleActionClick = (event: React.MouseEvent, task: Task) => {
      event.stopPropagation();
      if (task.status === "em andamento" || task.status === "não iniciada") {
        setSelectedDemand(task);
        setIsModalOpen(true);
      } else {
        navigate(`/demandas/${task.indexCard}`);
      }
    };
  
    const inferActivityType = (sectorName: string): 'design' | 'social_media' => {
      return sectorName.toLowerCase().includes('design') ? 'design' : 'social_media';
    };
    

    
  // --- ESTADO PARA AS TAREFAS DO KANBAN ---
  const [tasks, setTasks] = useState<Task[]>([]);

  // Efeito que atualiza as tarefas quando os dados da API chegam
  useEffect(() => {
    if (workerDemands) {
      const formattedTasks = workerDemands.map(
        (demand: WorkerDemand) => ({
          title: demand.nome_servico,
          status: mapStatus(demand.status),
          indexCard: demand.id_demanda,
          prazo: demand.prazo || "",
        })
      );
      setTasks(formattedTasks);
    }
  }, [workerDemands]);

  // Lógica calendário e filtros
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [tasksForSelectedDay, setTasksForSelectedDay] = useState<Task[]>([]);
  const deadlines = useMemo(() => tasks.map((task) => parseISO(task.prazo)), [tasks]);
  const modifiers = { hasDemands: deadlines };

  useEffect(() => {
    if (selectedDate) {
      const filtered = tasks.filter((task) =>
        isSameDay(parseISO(task.prazo), selectedDate)
      );
      setTasksForSelectedDay(filtered);
    } else {
      setTasksForSelectedDay([]);
    }
  }, [selectedDate, tasks]);

  const [timeFilter, setTimeFilter] = useState("semana");
  const filterOptions: FilterOption[] = [
    { value: "hoje", label: "Hoje", icon: "fa-solid fa-triangle-exclamation", baseColor: "bg-red-500", textColor: "text-white" },
    { value: "semana", label: "Esta Semana", icon: "fa-solid fa-hourglass-half", baseColor: "bg-yellow-500", textColor: "text-zinc-900" },
    { value: "mes", label: "Este Mês", icon: "fa-solid fa-calendar-days", baseColor: "bg-blue-500", textColor: "text-white" },
    { value: "geral", label: "Geral", icon: "fa-solid fa-globe", baseColor: "bg-zinc-700", textColor: "text-white" },
  ];

  return (
    <BaseScreen>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
        <PageTitle icon="fa-solid fa-list-check" title="Demandas" />
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <ColoredButton
            justify="justify-center"
            color="customYellow"
            width="w-full sm:w-fit"
            title="LISTA DE DEMANDAS"
            icon="fa-solid fa-eye"
            onClick={() => navigate("/demandas/lista")}
          />
          <ColoredButton
            justify="justify-center"
            onClick={() =>
              navigate("/demandas/nova", {
                state: { previousRoute: "/demandas" },
              })
            }
            color="customYellow"
            width="w-full sm:w-fit"
            title="ADICIONAR DEMANDA"
            icon="fa-solid fa-circle-plus"
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <Motion>
          <Box
            title="Calendário"
            subtitle="Clique em uma data para ver suas demandas com prazo no dia."
            width="w-full"
            height="h-fit"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-auto">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  className="rounded-md border border-zinc-800 bg-zinc-900"
                  modifiers={modifiers}
                />
                <div className="mt-4 space-y-2 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-customYellow rounded-sm" />
                    <span>Data selecionada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-zinc-900 border border-customYellow rounded-sm" />
                    <span>Dia com demandas</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-white font-black mb-2">
                  Demandas com prazo no dia:
                </div>
                {selectedDate ? (
                  <div className="bg-zinc-800 text-customYellow font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-calendar-day"></i>
                    {format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </div>
                ) : (
                  <div className="bg-zinc-800 text-zinc-400 font-bold py-2 px-4 rounded-lg inline-block mb-4">
                    Selecione uma data
                  </div>
                )}
                <div className="max-h-[390px] overflow-y-auto pr-2">
                  {tasksForSelectedDay.length > 0 ? (
                    tasksForSelectedDay.map((task) => (
                      <TaskCard
                        key={task.indexCard}
                        title={task.title}
                        status={task.status}
                        prazo={task.prazo}
                        indexCard={task.indexCard}
                        onClick={() => navigate(`/demandas/${task.indexCard}`)}
                      />
                    ))
                  ) : (
                    <div className="text-center text-zinc-400 py-20">
                      <i className="fa-solid fa-calendar-xmark text-4xl mb-4"></i>
                      <p>Nenhuma demanda com prazo para este dia.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Box>
        </Motion>

        <Motion>
          <Box
            title="Progresso das demandas"
            subtitle="Verifique o progresso e modifique o status das suas tarefas."
            width="w-full"
            height="h-fit"
          >
            <div className="mb-6">
              <FilterButtonGroup 
                options={filterOptions}
                selectedValue={timeFilter}
                onFilterChange={setTimeFilter}
              />
            </div>
            <StatusView
              isLoading={isLoading}
              isError={isError}
              errorMessage="Não foi possível carregar as demandas."
            >
              <div className="w-full overflow-x-auto">
                <div className="flex flex-col lg:flex-row justify-between w-full gap-4 lg:min-w-0 min-w-[800px]">
                <TaskColumn title="NÃO INICIADAS" tasks={tasks} status="não iniciada" onCardActionClick={handleActionClick} />
                    <TaskColumn title="EM ANDAMENTO" tasks={tasks} status="em andamento" onCardActionClick={handleActionClick} />
                    <TaskColumn title="CONCLUÍDAS" tasks={tasks} status="concluída" onCardActionClick={handleActionClick} />
                    <TaskColumn title="ATRASADAS" tasks={tasks} status="atrasada" onCardActionClick={handleActionClick} />
                  </div>
              </div>
            </StatusView>
          </Box>
        </Motion>
      </div>
      <ScrollToEndArrow />

      {isModalOpen && selectedDemand && (
        <CreateActivityModal
          demandId={selectedDemand.indexCard}
          activityType={inferActivityType(user?.nome_setor?.toLowerCase() || 'social media')} // teste
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </BaseScreen>


  );
};

export default DemandsScreen;
