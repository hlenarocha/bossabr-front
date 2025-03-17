import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";
import { greetingFunction } from "../utils/greetingFunction";

const WorkspaceScreen = () => {
  const greeting = greetingFunction();
  
  return (
    <>
      <BaseScreen>
        <PageTitle title="Área de Trabalho"></PageTitle>
          <Box
            title={`${greeting}, [user]!`}
            subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
            width="w-[1000px]"
            height="h-[700px]"
          >
            <div>TESTE</div>
          </Box>
          
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
