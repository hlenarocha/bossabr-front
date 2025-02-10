import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";

const WorkspaceScreen = () => {
  return (
    <>
      <BaseScreen>
        <h1 className="text-4xl text-white font-bold">Área de Trabalho</h1>
        <div className="mt-4">
          <Box
            title="Bom dia, [user]!"
            subtitle="Visualize os dados de pontuação, progresso das demandas e atividades dos últimos sete dias."
            width="w-[500px]"
            height="h-[378px]"
          ></Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default WorkspaceScreen;
