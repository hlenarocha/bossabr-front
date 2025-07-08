import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import TableHeader from "@/components/table/TableHeader";
import TableItem from "@/components/table/TableItem";
import SearchBar from "@/components/shared/SearchBar";
import ColoredButton from "@/components/shared/ColoredButton";
import { Motion } from "@/components/animation/Motion";
import { useNavigate } from "react-router-dom";


const ClientsScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <BaseScreen>
        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle icon="fa-solid fa-user-tie" marginTop="mt-4" title="Clientes"></PageTitle>
            <ColoredButton
                justify="justify-center"
                onClick={() =>
                    navigate("/clientes/novo", { state: { previousRoute: "/clientes" } })
                }
                color="customYellow"
                width="w-[300px]"
                title="ADICIONAR CLIENTE"
                icon="fa-solid fa-circle-plus"
            ></ColoredButton>
        </div>
        <div className="mt-4 ">
          <Motion>
            <Box
              title="Lista de Clientes"
              subtitle="Visualização da lista de clientes com base do progresso geral das tarefas relacionadas ao pedido do cliente."
              width="w-full max-w-[100%] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]"
              height="h-[640px]"
            >
              <SearchBar
                marginTop="mt-6"
                placeholder="Pesquise um cliente aqui..."
              ></SearchBar>
              <TableHeader
                columns={[
                  { width: "w-[25%]", content: "NOME" },
                  { width: "w-[25%]", content: "TIPOS DE SERVIÇO" },
                  { width: "w-[25%]", content: "SETORES RESPONSÁVEIS" },
                  { width: "w-[25%]", content: "PROGRESSO GERAL" },
                ]}
              />

              <div className="h-[70%] overflow-y-auto">
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
          </Motion>
        </div>
      </BaseScreen>
    </>
  );
};

export default ClientsScreen;
