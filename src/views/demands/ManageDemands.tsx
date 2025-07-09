import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";
import TableHeader from "@/components/table/TableHeader";
import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import { Motion } from "@/components/animation/Motion";

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
            <TableHeader
              columns={[
                { width: "w-[40%]", content: "TÍTULO" },
                { width: "w-[30%]", content: "PRIORIDADE" },
                { width: "w-[30%]", content: "STATUS" },
              ]}
            ></TableHeader>

            <div className="h-[80%] overflow-y-auto">
              {/* Aqui você vai colocar os itens da tabela */}
            </div>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default ManageDemands;
