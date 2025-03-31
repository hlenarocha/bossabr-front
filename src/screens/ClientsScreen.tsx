import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";

const ClientsScreen = () => {
  return (
    <>
      <BaseScreen>
        <PageTitle marginTop="mt-4" title="Clientes"></PageTitle>
        <div className="mt-4 ">
          <Box
            title="Lista de Clientes"
            subtitle="Visualização da lista de clientes com base do progresso geral das tarefas relacionadas ao pedido do cliente."
            width="w-[100%]"
            height="h-[378px]"
          >
            <div>TESTE</div>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default ClientsScreen;
