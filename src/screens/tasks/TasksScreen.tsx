import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import ColoredButton from "@/components/UI/ColoredButton";
import CustomCalendar from "@/components/UI/CustomCalendar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskColumn from "@/components/task/TaskColumn";
import TaskCard from "@/components/task/TaskCard";

const TasksScreen = () => {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false); // estado para controlar o drag over
  const [activeCard, setActiveCard] = useState<number | null>(null); // nenhum card está sendo arrastado
  const tasksTest = [
    {
      title: "Banner",
      status: "não iniciada",
      indexCard: 0,
      setActiveCard,
      activeCard,
    },
    {
      title: "Post Rosa",
      status: "em andamento",
      indexCard: 1,
      setActiveCard,
      activeCard,
    },
    {
      title: "Post Azul",
      status: "concluída",
      indexCard: 2,
      setActiveCard,
      activeCard,
    },
    {
      title: "Vídeo Legal",
      status: "atrasada",
      indexCard: 3,
      setActiveCard,
      activeCard,
    },
    {
      title: "Cartão",
      status: "não iniciada",
      indexCard: 4,
      setActiveCard,
      activeCard,
    },
    {
      title: "Cartão Rosa",
      status: "em andamento",
      indexCard: 5,
      setActiveCard,
      activeCard,
    },
    {
      title: "Post Lilás",
      status: "concluída",
      indexCard: 6,
      setActiveCard,
      activeCard,
    },
    {
      title: "Post Legal",
      status: "atrasada",
      indexCard: 7,
      setActiveCard,
      activeCard,
    },
    {
      title: "Post Marrom",
      status: "não iniciada",
      indexCard: 8,
      setActiveCard,
      activeCard,
    },
    {
      title: "Banner Legal",
      status: "em andamento",
      indexCard: 9,
      setActiveCard,
      activeCard,
    },
    {
      title: "Outdoor Arte",
      status: "concluída",
      indexCard: 10,
      setActiveCard,
      activeCard,
    },
    {
      title: "Post De Novo",
      status: "atrasada",
      indexCard: 11,
      setActiveCard,
      activeCard,
    },
    {
      title: "Banner De Novo",
      status: "não iniciada",
      indexCard: 12,
      setActiveCard,
      activeCard,
      },
      {
        title: "Banner Legal",
        status: "em andamento",
        indexCard: 13,
        setActiveCard,
        activeCard,
        
      },
      {
        title: "Banner Legal",
        status: "em andamento",
        indexCard: 14,
        setActiveCard,
        activeCard,

      },
      {
        title: "Banner Legal",
        status: "em andamento",
        indexCard: 15,
        setActiveCard,
        activeCard,

      },
      {
        title: "Banner Legal",
        status: "em andamento",
        indexCard: 16,
        setActiveCard,
        activeCard,

      }
  ];

  const [tasks, setTasks] = useState(tasksTest); // estado para armazenar as tarefas

  const onDrop = (status: string, position: number) => {
    if (activeCard === null) return;

    setTasks((prevTasks) => {
      const taskToMove = prevTasks.find(
        (task) => task.indexCard === activeCard
      );
      if (!taskToMove) return prevTasks;

      // Filtra a task que está sendo movida
      const filteredTasks = prevTasks.filter(
        (task) => task.indexCard !== taskToMove.indexCard
      );

      // Insere na nova posição com o novo status
      const updatedTasks = [
        ...filteredTasks.slice(0, position),
        { ...taskToMove, status },
        ...filteredTasks.slice(position),
      ];

      return updatedTasks;
    });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <BaseScreen>
        <div className="flex justify-end mb-4 flex-row gap-4">
          <ColoredButton
            justify="justify-center"
            color="customYellow"
            width="w-[280px]"
            title="LISTA DE DEMANDAS"
            icon="fa-solid fa-eye"
          ></ColoredButton>
          <ColoredButton
            justify="justify-center"
            onClick={() => handleNavigate("/tasks/create-task")}
            color="customYellow"
            width="w-[280px]"
            title="ADICIONAR DEMANDA"
            icon="fa-solid fa-circle-plus"
          ></ColoredButton>
        </div>
        <PageTitle marginTop="mt-4" title="Demandas"></PageTitle>
        <div className="flex flex-col w-full xl:w-[1000px]">
          <div className="flex flex-col xl:flex-row gap-4 items-center ">
            <Box
              title="Para esta semana"
              subtitle="Tarefas não finalizadas com prazos definidos para os próximos sete dias."
              width="w-full xl:w-1/3"
              height="h-[700px]"
            >
              <div className="max-h-[490px] overflow-y-auto">
                {tasks.map((task, index) => {
                  return (
                    // adicionar lógica para aparecer tarefas com prazo para os próximos sete dias

                    <TaskCard
                      key={index}
                      title={task.title}
                      status={task.status}
                      indexCard={task.indexCard}
                    />
                  );
                })}
              </div>
            </Box>

            <Box
              title="Calendário"
              subtitle="Visão mensal dos prazos das tarefas. Clique em uma data para verificar as tarefas com prazos naquele dia."
              width="w-full xl:w-2/3"
              height="h-[1000px] xl:h-[700px]"
            >
              <div className="xl:grid xl:grid-cols-2 xl:gap-10 flex flex-col">
                <div>
                  <div className="w-full flex flex-col items-center xl:items-start">
                    <CustomCalendar></CustomCalendar>
                  </div>
                  <div className="mt-5 flex flex-row items-center gap-2 text-sm">
                    <div className="w-[32px] h-[32px] bg-customYellow rounded-[3px]"></div>
                    <p>Data selecionada.</p>
                  </div>
                  <div className="mt-5 flex flex-row items-center gap-2 text-sm">
                    <div className="w-[32px] h-[32px] bg-[#1F1F1F] border border-customYellow rounded-[3px]"></div>
                    <p>Há demandas com prazo neste dia.</p>
                  </div>
                </div>
                <div className="justify-center">
                  <div className="text-center mt-2 text-[#9b9b9b] font-black">
                    DEMANDAS COM PRAZO NO DIA
                  </div>
                  <div className="text-center mt-2 mb-2 text-customYellow font-black">
                    DD/MM/AAAA
                  </div>
                  <div className="max-h-[200px] xl:max-h-[390px]  overflow-y-auto">
                {tasks.map((task, index) => {
                  return (
                    // adicionar lógica para aparecer tarefas com prazo para os próximos sete dias

                    <TaskCard
                      key={index}
                      title={task.title}
                      status={task.status}
                      indexCard={task.indexCard}
                    />
                  );
                })}
              </div>
                </div>
              </div>
            </Box>
          </div>
          <Box
            title="Progresso das Demandas"
            subtitle="Visualização do andamento das tarefas com prazo no período selecionado. Arraste uma demanda para outra coluna para alterar seu status."
            width="w-full"
            height="h-[500px]"
          >
            <div className="flex flex-row justify-between w-full gap-4">
              <TaskColumn
                setDragOver={setDragOver}
                title="NÃO INICIADAS"
                tasks={tasks}
                status="não iniciada"
                setActiveCard={setActiveCard}
                activeCard={activeCard}
                dragOver={dragOver}
                onDrop={onDrop}
              />
              <TaskColumn
                setDragOver={setDragOver}
                dragOver={dragOver}
                title="EM ANDAMENTO"
                tasks={tasks}
                status="em andamento"
                setActiveCard={setActiveCard}
                activeCard={activeCard}
                onDrop={onDrop}
              />
              <TaskColumn
                setDragOver={setDragOver}
                dragOver={dragOver}
                title="CONCLUÍDAS"
                tasks={tasks}
                status="concluída"
                setActiveCard={setActiveCard}
                activeCard={activeCard}
                onDrop={onDrop}
              />
              <TaskColumn
                setDragOver={setDragOver}
                dragOver={dragOver}
                title="ATRASADAS"
                tasks={tasks}
                status="atrasada"
                setActiveCard={setActiveCard}
                activeCard={activeCard}
                onDrop={onDrop}
              />
            </div>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default TasksScreen;
