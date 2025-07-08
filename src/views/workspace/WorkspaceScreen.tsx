import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { greetingFunction } from "@/utils/greetingFunction";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import ActivityCard from "@/components/activity/ActivityCard";
import ColoredButton from "@/components/shared/ColoredButton";
import ScoreBar from "@/components/shared/ScoreBar";
import TaskColumn from "@/components/task/TaskColumn";
import { useNavigate } from "react-router-dom";
import { useDragDrop } from "@/hooks/useDragDrop";
import { Motion } from "@/components/animation/Motion";
import ScrollToEndArrow from "@/components/shared/ScrollToEndArrow";

const WorkspaceScreen = () => {
  const greeting = greetingFunction();
  const { user} = useContext(UserContext); // desconstruindo objeto {}
  const navigate = useNavigate();
  // const [dragOver, setDragOver] = useState(false); // estado para controlar o drag over
  // const [activeCard, setActiveCard] = useState<number | null>(null); // nenhum card está sendo arrastado
  // const auth_token = Cookies.get("auth_token");


  console.log(user?.id_pessoa); // id_pessoa do usuário logado

  
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

  // Usando o hook que gerencia todo o estado de drag and drop
  const {
    tasks,
    // setTasks,
    activeCard,
    setActiveCard,
    onDrop,
  } = useDragDrop(initialTasks);

  console.log(activeCard);
  console.log(user?.url_avatar);

  return (
    <>
      <BaseScreen>
        <div className="flex items-center cursor-default  mt-4 gap-4">
          <div className="w-12 h-12  flex justify-center items-center bg-white bg-opacity-50 rounded-full shadow-[inset_-4px_-4px_5px_0px_rgba(255, 255, 255, 0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)]">
            <img className="rounded-full w-10 h-10" src={user?.url_avatar}></img>
          </div>
          <p className="text-white font-bold text-xl">{user?.first_name}</p>
        </div>
        <PageTitle marginTop="mt-6" title="Área de Trabalho" icon="fa-solid fa-desktop"></PageTitle>

        <Motion>
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
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                  <InputString
                    title="EQUIPE"
                    placeholder={user?.nome_equipe || ""} // colocar equipe no lugar de user?.first_name
                    isMandatory={false}
                    height="h-8"
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                  <InputString
                    title="SETOR"
                    placeholder={user?.nome_setor || ""} // colocar equipe no lugar de user?.first_name
                    isMandatory={false}
                    height="h-8"
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                 
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
            </div>
            <div className="flex w-full mt-10 justify-center">
              <ColoredButton
                onClick={() => {
                  navigate("/relatorios");
                }}
                title="VISUALIZAR RELATÓRIO DIÁRIO"
                width="w-[60%]"
                icon="fa-solid fa-eye"
                color="customYellow"
                justify="justify-center"
              ></ColoredButton>
            </div>
          </Box>
        </Motion>
        <ScrollToEndArrow/>
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
