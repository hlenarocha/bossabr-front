import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";

const WorkspaceScreen = () => {
  return (
    <>
      <BaseScreen>
      <PageTitle title="Área de Trabalho"></PageTitle>
        <div className="flex flex-row gap-5">
          <Box
            title="Bom dia, [user]!"
            subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
            width="w-[500px]"
            height="h-[378px]"
          ></Box>
          <Box
          title="Bom dia, [user]!"
          subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
          width="w-[500px]"
          height="h-[378px]"
          
          >

          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
