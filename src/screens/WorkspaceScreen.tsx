import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { greetingFunction } from "@/utils/greetingFunction";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import InputTitle from "@/components/title/InputTitle";
import InputText from "@/components/UI/InputString";
import SectorTag from "@/components/tags/SectorTag";
import ActivityCard from "@/components/activity/ActivityCard";
import ColoredButton from "@/components/UI/ColoredButton";

const WorkspaceScreen = () => {
  const greeting = greetingFunction();
  const { user } = useContext(UserContext); // desconstruindo objeto {}

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
          height="h-[700px]"
        >
          <div className="flex flex-row gap-12 w-full">
            <div className="flex flex-col w-[55%]">
              <InputTitle title="Informações básicas"></InputTitle>
              <div className="flex flex-row gap-4">
                <InputText
                  title="NOME"
                  placeholder={user?.first_name || ""}
                  isMandatory={false}
                  width="w-[40%]"
                  height="h-8"
                  isReadOnly={true}
                ></InputText>
                <InputText
                  title="EQUIPE"
                  placeholder={user?.first_name || ""} // colocar equipe
                  isMandatory={false}
                  width="w-[30%]"
                  height="h-8"
                  isReadOnly={true}
                ></InputText>
                <div className="flex flex-col">
                  <p className="mt-4 mb-1">SETOR</p>
                  <SectorTag></SectorTag>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
            <InputTitle title="Atividades"></InputTitle>
            <div className="text-sm mt-2 mb-2">Auditoria da Equipe - Hoje</div>
            <ActivityCard
              width="w-full"
              title="Pessoa X conclui atividade Y"
              details="Atividades realizadas nos últimos sete dias."
            />

            </div>
           
          </div>
          {/* <TableHeader
              columns={[
                { width: "w-[25%]", content: "NÃO INICIADAS" },
                { width: "w-[25%]", content: "EM ANDAMENTO" },
                { width: "w-[25%]", content: "CONCLUÍDAS" },
                { width: "w-[25%]", content: "ATRASADAS" },
              ]}
            ></TableHeader> */}
          <div className="flex mt-80 w-full justify-center bottom-10">
            <ColoredButton
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
