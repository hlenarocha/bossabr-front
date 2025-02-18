import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";

const WorkspaceScreen = () => {
  return (
    <>
      <BaseScreen>
        <PageTitle title="Área de Trabalho"></PageTitle>
        <div className="flex flex-col lg:flex-row gap-5 items-center">
          <Box
            title="Bom dia, [user]!"
            subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
            width="w-[450px] lg:w-[500px]"
            height="h-[378px]"
          >
            <div>TESTE</div>
          </Box>
          <Box
            title="Bom dia, [user]!"
            subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
            width="w-[450px] lg:w-[500px]"
            height="h-[378px]"
          >
            <div>TESTE</div>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
