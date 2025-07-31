import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import ColoredButton from "@/components/shared/ColoredButton";
// import CustomCalendar from "@/components/UI/CustomCalendar";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import TaskColumn from "@/components/task/TaskColumn";
import TaskCard from "@/components/task/TaskCard";
import { useDragDrop } from "@/hooks/useDragDrop";
import { Calendar } from "@/components/ui/calendar";
import { Motion } from "@/components/animation/Motion";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";
import { useState } from "react";
import CreateActivityModal from "@/views/activities/CreateActivityModal";

const DemandsScreen = () => {
  const navigate = useNavigate();

  // const [dragOver, setDragOver] = useState(false); // estado para controlar o drag over
  // const [activeCard, setActiveCard] = useState<number | null>(null); // nenhum card está sendo arrastado

  const initialTasks = [
    { title: "Banner", status: "não iniciada" },
    { title: "Post Rosa", status: "em andamento" },
    { title: "Post Azul", status: "concluída" },
    { title: "Vídeo Legal", status: "atrasada" },
    { title: "Cartão", status: "não iniciada" },
    { title: "Cartão Rosa", status: "em andamento" },
    { title: "Post Lilás", status: "concluída" },
    { title: "Post Legal", status: "atrasada" },
    { title: "Post Marrom", status: "não iniciada" },
    { title: "Banner Legal", status: "em andamento" },
    { title: "Outdoor Arte", status: "concluída" },
    { title: "Post De Novo", status: "atrasada" },
    { title: "Banner De Novo", status: "não iniciada" },
    { title: "Banner Legal", status: "em andamento" },
    { title: "Banner Legal", status: "em andamento" },
    { title: "Banner Legal", status: "em andamento" },
    { title: "Banner Legal", status: "em andamento" },
  ];

  // Use o hook que gerencia todo o estado de drag and drop
  const {
    tasks,
    // setTasks,
    activeCard,
    setActiveCard,

    onDrop,
  } = useDragDrop(initialTasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemandId, setSelectedDemandId] = useState<number | null>(null);

  // --- 3. FUNÇÃO PARA ABRIR O MODAL ---
  const handleOpenActivityModal = (demandId: number) => {
    setSelectedDemandId(demandId);
    setIsModalOpen(true);
  };


  return (
    <>
      <BaseScreen>
        <div className="flex justify-between mb-4 flex-row gap-4">
          <PageTitle icon="fa-solid fa-list-check" marginTop="mt-4" title="Demandas"></PageTitle>
          <div className="flex gap-4">
            <ColoredButton
              justify="justify-center"
              color="customYellow"
              width="w-[280px]"
              title="LISTA DE DEMANDAS"
              icon="fa-solid fa-eye"
              onClick={() => navigate("/demandas/lista")}
            ></ColoredButton>
            <ColoredButton
              justify="justify-center"
              onClick={() => navigate("/demandas/nova", { state: { previousRoute: "/demandas" } })}
              color="customYellow"
              width="w-[280px]"
              title="ADICIONAR DEMANDA"
              icon="fa-solid fa-circle-plus"
            ></ColoredButton>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <Motion>
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
                      {/* <CustomCalendar></CustomCalendar> */}
                      <Calendar></Calendar>
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
                            onClick={() => handleOpenActivityModal(task.indexCard)}

                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </Motion>
          <Motion>
            <Box
              title="Progresso das Demandas"
              subtitle="Visualização do andamento das tarefas com prazo no período selecionado. Arraste uma demanda para outra coluna para alterar seu status."
              width="w-full"
              height="h-[500px]"
            >
              <div className="flex flex-row justify-between w-full gap-4">
                <TaskColumn
                  title="NÃO INICIADAS"
                  tasks={tasks}
                  status="não iniciada"
                  setActiveCard={setActiveCard}
                  activeCard={activeCard}
                  onDrop={onDrop}
                />
                <TaskColumn
                  title="EM ANDAMENTO"
                  tasks={tasks}
                  status="em andamento"
                  setActiveCard={setActiveCard}
                  activeCard={activeCard}
                  onDrop={onDrop}
                />
                <TaskColumn
                  title="CONCLUÍDAS"
                  tasks={tasks}
                  status="concluída"
                  setActiveCard={setActiveCard}
                  activeCard={activeCard}
                  onDrop={onDrop}
                />
                <TaskColumn
                  title="ATRASADAS"
                  tasks={tasks}
                  status="atrasada"
                  setActiveCard={setActiveCard}
                  activeCard={activeCard}
                  onDrop={onDrop}
                />
              </div>
            </Box>
          </Motion>
        </div>
        <ScrollToEndArrow />

      </BaseScreen>
      {isModalOpen && (
        <CreateActivityModal
          demandId={selectedDemandId!}
          // Para o teste, vamos assumir que o usuário é um designer.
          // No futuro, isso viria do seu contexto de autenticação.
          activityType="social_media" 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default DemandsScreen;