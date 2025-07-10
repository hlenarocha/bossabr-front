import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";
import TableHeader from "@/components/table/TableHeader";
import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import { Motion } from "@/components/animation/Motion";

const ManageServices = () => {
  const navigate = useNavigate();



  return (
    <>
      <BaseScreen>
        <div className="flex items-center justify-between">
          <BackButton onClick={() => navigate("/configuracoes")}></BackButton>

          <ColoredButton
            justify="justify-center"
            onClick={() => navigate("/configuracoes/servicos/novo", { state: { previousRoute: "/configuracoes/servicos" } })}
            color="customYellow"
            width="w-[330px]"
            title="ADICIONAR TIPO DE SERVIÇO"
            icon="fa-solid fa-circle-plus"
          ></ColoredButton>
        </div>

        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle
            marginTop="mt-6"
            title="Configurar Tipos de Serviço"
          ></PageTitle>
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise um tipo de serviço aqui..."
          ></SearchBar>
        </div>
        <Motion>
          <Box
            width="w-full"

            height="h-[640px]"
            title="Lista de Tipos de Serviço"
            subtitle="Visualização da lista de tipos de serviço para configuração."
          >
            <TableHeader
              columns={[
                { width: "w-[50%]", content: "NOME" },
                { width: "w-[50%]", content: "DESCRIÇÃO" },
              ]}
            ></TableHeader>

            <div className="h-[80%] overflow-y-auto">
              {/* Lista de serviços será exibida aqui futuramente */}
            </div>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default ManageServices;
