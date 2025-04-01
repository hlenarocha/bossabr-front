import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import TableHeader from "@/components/table/TableHeader";

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
            <TableHeader
              columns={[
                { width: "w-[25%]", content: "NOME" },
                { width: "w-[25%]", content: "TIPOS DE SERVIÇO" },
                { width: "w-[25%]", content: "SETORES RESPONSÁVEIS" },
                { width: "w-[25%]", content: "PROGRESSO GERAL" },

              ]}
            ></TableHeader>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default ClientsScreen;
