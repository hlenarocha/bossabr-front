import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";

const ClientsScreen = () => {
  return (
    <>
      <BaseScreen>
      <PageTitle title="Clientes"></PageTitle>
        <div className="mt-4">
          <Box
            title="Lista de Clientes"
            subtitle="Visualização da lista de clientes com base do progresso geral das tarefas relacionadas ao pedido do cliente."
            width="w-[500px]"
            height="h-[378px]"
          ></Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default ClientsScreen;
