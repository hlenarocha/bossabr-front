import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";

import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import { Motion } from "@/components/animation/Motion";
import TableItem from "@/components/table/TableItem";

const ManageDemands = () => {
  const navigate = useNavigate();



  return (
    <>
      <BaseScreen>
        <div className="flex items-center justify-between">
          <BackButton onClick={() => navigate("/configuracoes")}></BackButton>

          <ColoredButton
            justify="justify-center"
            onClick={() => navigate("/configuracoes/demandas/nova", { state: { previousRoute: "/configuracoes/demandas" } })}
            color="customYellow"
            width="w-[330px]"
            title="ADICIONAR DEMANDA"
            icon="fa-solid fa-circle-plus"
          ></ColoredButton>
        </div>

        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle
            marginTop="mt-6"
            title="Configurar Demandas"
          ></PageTitle>
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise uma demanda aqui..."
          ></SearchBar>
        </div>
        <Motion>
          <Box
            width="w-full"

            height="h-[640px]"
            title="Lista de Demandas"
            subtitle="Visualização da lista de demandas para configuração."
          >
            <TableItem

              columns={[
                { width: "20%", content: "TIPO DE SERVIÇO" },
                { width: "20%", content: "CLIENTE" },
                { width: "20%", content: "STATUS" },
                { width: "20%", content: "RESPONSÁVEL ATUAL" },
                { width: "10%", content: "PRAZO" },

                { width: "10%", content: "AÇÕES" },
              ]}
              isTableHeader={true}
              itemHeight="h-12"
            />
            <div className="h-[80%] overflow-y-auto">
              {/* Aqui você vai colocar os itens da tabela */}
              <TableItem
                columns={[
                  { width: "20%", content: "Serviço A" },
                  { width: "20%", content: "Cliente X" },
                  { width: "20%", content: "Colaborador Y" },
                  { width: "20%", content: "Em andamento" },
                  { width: "10%", content: "01/01/2024" },


                  {
                    width: "10%", content: (
                      <i
                        className="fa-solid fa-pencil text-lg text-customYellow hover:cursor-pointer"
                        title="Visualizar / Editar"
                        onClick={() => navigate("/configuracoes/demandas/1")}
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
      </BaseScreen>
    </>
  );
};

export default ManageDemands;
