import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import TableHeader from "@/components/table/TableHeader";
import TableItem from "@/components/table/TableItem";

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
            height="h-[640px]"
          >
            <TableHeader
              columns={[
                { width: "w-[25%]", content: "NOME" },
                { width: "w-[25%]", content: "TIPOS DE SERVIÇO" },
                { width: "w-[25%]", content: "SETORES RESPONSÁVEIS" },
                { width: "w-[25%]", content: "PROGRESSO GERAL" },
              ]}
            />

            <div className="h-[65%] overflow-y-auto">
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
              <TableItem
                itemWidth="w-full "
                itemHeight="h-16"
                columns={[
                  {
                    width: "w-[25%]",
                    content: "Nome",
                  },
                  { width: "w-[25%]", content: "Tipos" },
                  { width: "w-[25%]", content: "Setores" },
                  { width: "w-[25%]", content: "Progresso" },
                ]}
                icon="fa-eye"
              ></TableItem>
            </div>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default ClientsScreen;
