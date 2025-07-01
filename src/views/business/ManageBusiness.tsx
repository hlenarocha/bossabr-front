import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";
import TableHeader from "@/components/table/TableHeader";
import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import { Motion } from "@/components/animation/Motion";

const ManageBusiness = () => {
  const navigate = useNavigate();


  return (
    <>
      <BaseScreen>
        <div className="flex items-center justify-between">
          <BackButton onClick={() => navigate("/configuracoes")}></BackButton>

          <ColoredButton
            justify="justify-center"
            onClick={() => navigate("/configuracoes/negocios/novo", { state: { previousRoute: "/configuracoes/negocios" } })}
            color="customYellow"
            width="w-[330px]"
            title="ADICIONAR SETOR DE NEGÓCIO"
            icon="fa-solid fa-circle-plus"
          ></ColoredButton>
        </div>

        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle
            marginTop="mt-6"
            title="Configurar Setores de Negócio"
          ></PageTitle>
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise um setor de negócio aqui..."
          ></SearchBar>
        </div>
        <Motion>
          <Box
            width="w-[600px] lg:w-[800px] xl:w-[1000px]"
            height="h-[640px]"
            title="Lista de Setores de Negócio"
            subtitle="Visualização da lista de setores de negócio para configuração."
          >
            <TableHeader
              columns={[
                { width: "w-[40%]", content: "NOME" },
                { width: "w-[60%]", content: "DESCRIÇÃO" },
              ]}
            ></TableHeader>

            <div className="h-[80%] overflow-y-auto">
              {/* Aqui você irá adicionar os itens da tabela futuramente */}
            </div>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default ManageBusiness;
