import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
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
        <div className="flex w-[100%] justify-end">
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

        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle icon="fa-solid fa-user-tie" marginTop="mt-4" title="Clientes"></PageTitle>
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise um cliente aqui..."
          ></SearchBar>
        </div>
        <div className="mt-4 ">
          <Motion>
            <Box
              title="Lista de Clientes"
              subtitle="Visualização da lista de clientes com base do progresso geral das tarefas relacionadas ao pedido do cliente."
              width="w-full"

              height="h-fit"
            >
               <TableItem
            columns={[
              { width: "25%", content: "NOME" },
              { width: "25%", content: "RESPONSÁVEL" },
              { width: "25%", content: "SETOR DE NEGÓCIO" },
              { width: "10%", content: "ATIVO" },
              { width: "15%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />

              <div className="h-[350px] overflow-y-auto">
                <TableItem
                  columns={[
                    { width: "25%", content: "Cliente A" },
                    { width: "25%", content: "João Silva" },
                    { width: "25%", content: "Setor X" },
                    { width: "10%", content: "Sim" },
                    {
                      width: "15%",
                      content: (
                        <i
                          className="fa-solid fa-eye text-lg text-customYellow hover:cursor-pointer"
                          title="Visualizar Detalhes"
                          onClick={() => navigate("/clientes/1/details")}
                        ></i>
                      ),
                    },
                  ]}
                  isTableHeader={false}
                  itemHeight="h-12"
                />
              </div>
            </Box>
          </Motion>
        </div>
      </BaseScreen>
    </>
  );
};

export default ClientsScreen;
