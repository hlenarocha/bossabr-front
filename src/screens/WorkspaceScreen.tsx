import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";
import { greetingFunction } from "../utils/greetingFunction";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


const WorkspaceScreen = () => {
  const greeting = greetingFunction();
  const { user } = useContext(UserContext); // desconstruindo objeto {}
  
  return (
    <>
      <BaseScreen>
        <PageTitle title="Área de Trabalho"></PageTitle>
          <Box
            title={`${greeting}, ${user?.first_name}!`}
            subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
            width="w-[500px] md:w-[700px] lg:w-[900px]"
            height="h-[700px]"
          >
            <div>TESTE</div>
          </Box>
          
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
