import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";
import ColoredButton from "../components/UI/ColoredButton";
import CustomCalendar from "../components/UI/CustomCalendar";

const TasksScreen = () => {
  return (
    <>
      <BaseScreen>
        <div className="flex justify-end mb-4 flex-row gap-4">
          <ColoredButton
            color="customYellow"
            width="w-[250px]"
            title="LISTA DE DEMANDAS"
            icon="fa-solid fa-eye"
          ></ColoredButton>
          <ColoredButton
            color="customYellow"
            width="w-[250px]"
            title="ADICIONAR DEMANDA"
            icon="fa-solid fa-circle-plus"
          ></ColoredButton>
        </div>
        <PageTitle title="Demandas"></PageTitle>
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <Box
              title="Para esta semana"
              subtitle="Tarefas não finalizadas com prazos definidos para os próximos sete dias."
              width="w-[300px]"
              height="h-[700px]"
            >
              <div>TESTE</div>
            </Box>

            <Box
              title="Calendário"
              subtitle="Visão mensal dos prazos das tarefas. Clique em uma data para verificar as tarefas com prazos naquele dia."
              width="w-[760px]"
              height="h-[700px]"
            >
              <div className="grid grid-cols-2 gap-24">
                <div>
                  <CustomCalendar></CustomCalendar>
                  <div className="mt-5 flex flex-row items-center gap-2 text-sm">
                    <div className="w-[32px] h-[32px] bg-customYellow rounded-[3px]"></div>
                    <p>Data selecionada.</p>
                  </div>
                  <div className="mt-5 flex flex-row items-center gap-2 text-sm">
                    <div className="w-[32px] h-[32px] bg-[#1F1F1F] border border-customYellow rounded-[3px]"></div>
                    <p>Há demandas com prazo neste dia.</p>
                  </div>
                </div>
                <div className="justify-center">
                  <div className="text-center mt-5 text-[#9b9b9b] font-black">DEMANDAS COM PRAZO NO DIA</div>
                  <div className="text-center mt-5 text-customYellow font-black">DD/MM/AAAA</div>
                  </div>
              </div>
            </Box>
          </div>
          <Box
            title="Progresso das Demandas"
            subtitle="Visualização do andamento das tarefas com prazo no período selecionado."
            width="w-full"
            height="h-[600px]"
          >
            <div>TESTE</div>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default TasksScreen;
