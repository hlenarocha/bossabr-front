import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";

const TasksScreen = () => {
  return (
    <>
      <BaseScreen>
        <h1 className="text-4xl text-white font-bold">Demandas</h1>
        <div className="mt-4">
          <Box title="Para esta semana" subtitle="Tarefas não finalizadas com prazos definidos para os próximos sete dias." width="w-[500px]" height="h-[378px]">
          </Box>
          
        </div>
      </BaseScreen>
    </>
  );
};

export default TasksScreen;
