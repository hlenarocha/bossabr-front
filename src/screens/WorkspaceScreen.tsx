import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { greetingFunction } from "@/utils/greetingFunction";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/UI/InputString";
import SectorTag from "@/components/tags/SectorTag";
import ActivityCard from "@/components/activity/ActivityCard";
import ColoredButton from "@/components/UI/ColoredButton";
import ScoreBar from "@/components/UI/ScoreBar";
import TaskColumn from "@/components/task/TaskColumn";
import { useNavigate } from "react-router-dom";

const WorkspaceScreen = () => {
  const greeting = greetingFunction();
  const { user } = useContext(UserContext); // desconstruindo objeto {}
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
    // { title: "Post Marrom", status: "não iniciada", indexCard: 8, setActiveCard, activeCard },
    // { title: "Banner Legal", status: "em andamento", indexCard: 9, setActiveCard, activeCard },
    // { title: "Outdoor Arte", status: "concluída", indexCard: 10, setActiveCard, activeCard },
    // { title: "Post De Novo", status: "atrasada", indexCard: 11, setActiveCard, activeCard },
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

  return (
    <>
      <BaseScreen>
        <div className="flex items-center cursor-default  mt-4 gap-4">
          <div className="w-12 h-12  flex justify-center items-center bg-white bg-opacity-50 rounded-full shadow-[inset_-4px_-4px_5px_0px_rgba(255, 255, 255, 0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)]">
            <img className="rounded-full w-10 h-10" src={user?.avatar}></img>
          </div>
          <p className="text-white font-bold text-xl">{user?.first_name}</p>
        </div>
        <PageTitle marginTop="mt-6" title="Área de Trabalho"></PageTitle>

        <Box
          title={`${greeting}, ${user?.first_name}!`}
          subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
          width="w-full md:w-[700px] lg:w-[900px]"
          height="h-fit"
        >
          <div className="flex w-[100%] flex-row gap-8 mt-8 ">
            <div className="flex flex-col w-2/3 gap-2">
              <InputTitle title="Informações básicas"></InputTitle>
              <div className="flex flex-row gap-2 w-full flex-wrap">
                <InputString
                  title="NOME"
                  placeholder={user?.first_name || ""}
                  isMandatory={false}
                  height="h-8"
                  width="w-[50%]"
                  isReadOnly={true}
                ></InputString>
                <InputString
                  title="EQUIPE"
                  placeholder={user?.first_name || ""} // colocar equipe no lugar de user?.first_name
                  isMandatory={false}
                  height="h-8"
                  width="w-[25%]"
                  isReadOnly={true}
                ></InputString>
                <div className="flex flex-col w-fit">
                  <p className="mt-4 text-sm font-black text-white mb-1">SETOR</p>
                  <SectorTag></SectorTag>
                </div>
              </div>
              <div className="mt-4">
                <InputTitle title="Pontuação semanal"></InputTitle>
                <ScoreBar />
              </div>
            </div>

            <div className="flex flex-col w-1/3">
              <InputTitle title="Atividades"></InputTitle>
              <div className="text-sm mt-2 mb-2">
                Auditoria da Equipe - Hoje
              </div>
              <div className="flex flex-col gap-1 h-[170px] overflow-y-auto ">
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
          <div className="mt-12 flex flex-col gap-4">
            <InputTitle title="Progresso das demandas"></InputTitle>
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
          </div>
          <div className="flex w-full mt-10 justify-center">
            <ColoredButton
            onClick={() => {navigate("/reports")}}
              title="VISUALIZAR RELATÓRIO DIÁRIO"
              width="w-[60%]"
              icon="fa-solid fa-eye"
              color="customYellow"
              justify="justify-center"
            ></ColoredButton>
          </div>
        </Box>
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
