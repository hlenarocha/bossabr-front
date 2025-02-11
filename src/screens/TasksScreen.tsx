import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";

const TasksScreen = () => {
  return (
    <>
      <BaseScreen>
      <PageTitle title="Demandas"></PageTitle>
        <div className="mt-4">
          <Box title="Para esta semana" subtitle="Tarefas não finalizadas com prazos definidos para os próximos sete dias." width="w-[500px]" height="h-[378px]">
          </Box>
          
        </div>
      </BaseScreen>
    </>
  );
};

export default TasksScreen;
