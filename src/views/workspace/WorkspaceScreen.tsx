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
  const { user } = useContext(UserContext); // desconstruindo objeto {}
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
  console.log("Avatar: ", user?.url_avatar);
  console.log("Last: ", user?.last_name);


  return (
    <>
      <BaseScreen>
        <div className="w-full flex items-center justify-between cursor-default mt-4">
          <PageTitle title="Área de Trabalho" icon="fa-solid fa-desktop" />

          <div className="flex items-center hover:bg-zinc-900 hover:cursor-pointer gap-4 bg-black/20 backdrop-blur-sm rounded-[20px] p-2 pr-6 shadow-md">
            <div className="w-20 h-20 flex justify-center items-center bg-white bg-opacity-50 rounded-full shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)]">
              <img
                className="rounded-full w-16 h-16" 
                src={user?.url_avatar}
                alt={`Avatar de ${user?.first_name}`}
              />
            </div>

            <p className="text-white font-bold text-2xl">{user?.first_name} {user?.last_name}</p>
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
                    placeholder={user?.nome_equipe || ""}
                    isMandatory={false}
                    height="h-8"
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                 
                </div>
                <div className="flex flex-row gap-2 w-full flex-wrap">

                <InputString
                    title="SETOR"
                    placeholder={user?.nome_setor || ""}
                    isMandatory={false}
                    height="h-8"
                    width="w-fit"
                    isReadOnly={true}
                  ></InputString>
                  <InputString
                    title="CARGO"
                    placeholder={user?.role || ""}
                    isMandatory={false}
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
                  navigate("/diario");
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
