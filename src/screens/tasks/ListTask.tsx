import BaseScreen from "@/screens/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import TableHeader from "@/components/table/TableHeader";
import TableItem from "@/components/table/TableItem";

const ListTask = () => {
  return (
    <>
      <BaseScreen>
        <PageTitle marginTop="mt-4" title="Demandas"></PageTitle>
        <div className="mt-4 ">
          <Box
            title="Lista de Demandas"
            subtitle="Visualização da lista de demandas."
            // LEMBRETE HELENA: Arrumar largura
            width="w-[800px]"
            height="h-[640px]"
          >

            <TableHeader
              columns={[
                { width: "w-[25%]", content: "NOME" },
                { width: "w-[25%]", content: "TIPOS DE SERVIÇO" },
                { width: "w-[25%]", content: "SETOR" },
                { width: "w-[25%]", content: "STATUS" },
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

export default ListTask;
