// hooks e bibliotecas
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO, isSameDay, addDays, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import ColoredButton from "@/components/shared/ColoredButton";
import TaskColumn from "@/components/task/TaskColumn";
import TaskCard from "@/components/task/TaskCard";
import { useDragDrop } from "@/hooks/useDragDrop";
import { Calendar } from "@/components/ui/calendar";
import { Motion } from "@/components/animation/Motion";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";

// Interface para as tarefas
interface Task {
  title: string;
  status: "não iniciada" | "em andamento" | "concluída" | "atrasada";
  indexCard: number;
  prazo: string; // Formato YYYY-MM-DD
}

const DemandsScreen = () => {
  const navigate = useNavigate();

  // --- DADOS MOCKADOS COM DATAS DINÂMICAS ---
  const allTasks: Task[] = useMemo(() => {
    const today = new Date();
    return [
      { title: "Campanha Dia das Mães - Post 1", status: "concluída", indexCard: 1, prazo: format(addDays(today, -2), 'yyyy-MM-dd') },
      { title: "Reel Institucional - Cliente X", status: "em andamento", indexCard: 2, prazo: format(today, 'yyyy-MM-dd') },
      { title: "Criação de Logo - Startup Y", status: "não iniciada", indexCard: 3, prazo: format(today, 'yyyy-MM-dd') },
      { title: "Ajustes Landing Page - Cliente Z", status: "atrasada", indexCard: 4, prazo: format(addDays(today, -5), 'yyyy-MM-dd') },
      { title: "Copy para E-mail Mkt", status: "em andamento", indexCard: 5, prazo: format(addDays(today, 3), 'yyyy-MM-dd') },
      { title: "Design de Cartão de Visita", status: "concluída", indexCard: 6, prazo: format(addDays(today, 5), 'yyyy-MM-dd') },
    ];
  }, []);

  const { tasks, setTasks, activeCard, setActiveCard, onDrop } = useDragDrop(allTasks);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasksForSelectedDay, setTasksForSelectedDay] = useState<Task[]>([]);
  const [timeFilter, setTimeFilter] = useState('semana');

  // Lógica para destacar dias com demandas no calendário
  const deadlines = useMemo(() => allTasks.map(task => parseISO(task.prazo)), [allTasks]);
  const modifiers = { hasDemands: deadlines };
  
  // Filtra as tarefas para o dia selecionado no calendário
  useEffect(() => {
    if (selectedDate) {
      const filtered = allTasks.filter(task => isSameDay(parseISO(task.prazo), selectedDate));
      setTasksForSelectedDay(filtered);
    } else {
      setTasksForSelectedDay([]);
    }
  }, [selectedDate, allTasks]);

  // Opções e estilos para os botões de filtro
  const filterOptions = [
    { value: 'hoje', label: 'Hoje', icon: 'fa-solid fa-triangle-exclamation', baseColor: 'bg-red-500', textColor: 'text-white' },
    { value: 'semana', label: 'Esta Semana', icon: 'fa-solid fa-hourglass-half', baseColor: 'bg-yellow-500', textColor: 'text-zinc-900' },
    { value: 'mes', label: 'Este Mês', icon: 'fa-solid fa-calendar-days', baseColor: 'bg-blue-500', textColor: 'text-white' },
    { value: 'geral', label: 'Geral', icon: 'fa-solid fa-globe', baseColor: 'bg-zinc-700', textColor: 'text-white' },
  ];
  
  const getButtonClass = (value: string, baseColor: string, textColor: string) => {
    const baseClass = "font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2";
    if (timeFilter === value) {
      return `${baseClass} ${baseColor} ${textColor} ring-2 ring-offset-2 ring-offset-zinc-900 ring-white`;
    }
    return `${baseClass} ${baseColor} ${textColor} opacity-60 hover:opacity-100`;
  };

  return (
    <BaseScreen>
      <div className="flex justify-between mb-4 flex-row gap-4">
        <PageTitle icon="fa-solid fa-list-check" marginTop="mt-4" title="Demandas" />
        <div className="flex gap-4">
          <ColoredButton justify="justify-center" color="customYellow" width="w-[280px]" title="LISTA DE DEMANDAS" icon="fa-solid fa-eye" onClick={() => navigate("/demandas/lista")} />
          <ColoredButton justify="justify-center" onClick={() => navigate("/demandas/nova", { state: { previousRoute: "/demandas" } })} color="customYellow" width="w-[280px]" title="ADICIONAR DEMANDA" icon="fa-solid fa-circle-plus" />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <Motion>
          <Box title="Calendário de Prazos" subtitle="Clique em uma data para ver as demandas com prazo no dia." width="w-full" height="h-fit">
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
                    <span>Data Selecionada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-zinc-900 border border-customYellow rounded-sm" />
                    <span>Dia com Demandas</span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-white font-black mb-2">Demandas com prazo no dia:</div>
                {selectedDate ? (
                  <div className="bg-zinc-800 text-customYellow font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-calendar-day"></i>
                    {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </div>
                ) : (
                   <div className="bg-zinc-800 text-zinc-400 font-bold py-2 px-4 rounded-lg inline-block mb-4">Selecione uma data</div>
                )}
                
                <div className="max-h-[390px] overflow-y-auto pr-2">
                  {tasksForSelectedDay.length > 0 ? (
                    tasksForSelectedDay.map((task) => (
                      <TaskCard key={task.indexCard} title={task.title} status={task.status} indexCard={task.indexCard} onClick={() => navigate(`/demandas/${task.indexCard}`)} />
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
          <Box title="Progresso das Demandas" subtitle="Arraste uma demanda para alterar seu status." width="w-full" height="h-[500px]" >
            <div className="flex flex-wrap gap-4 mb-6">
              {filterOptions.map(option => (
                <button key={option.value} onClick={() => setTimeFilter(option.value)} className={getButtonClass(option.value, option.baseColor, option.textColor)}>
                  <i className={option.icon}></i>
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex flex-row justify-between w-full gap-4">
              <TaskColumn title="NÃO INICIADAS" tasks={tasks} status="não iniciada" setActiveCard={setActiveCard} activeCard={activeCard} onDrop={onDrop} />
              <TaskColumn title="EM ANDAMENTO" tasks={tasks} status="em andamento" setActiveCard={setActiveCard} activeCard={activeCard} onDrop={onDrop} />
              <TaskColumn title="CONCLUÍDAS" tasks={tasks} status="concluída" setActiveCard={setActiveCard} activeCard={activeCard} onDrop={onDrop} />
              <TaskColumn title="ATRASADAS" tasks={tasks} status="atrasada" setActiveCard={setActiveCard} activeCard={activeCard} onDrop={onDrop} />
            </div>
          </Box>
        </Motion>
      </div>
      <ScrollToEndArrow />
    </BaseScreen>
  );
};

export default DemandsScreen;
