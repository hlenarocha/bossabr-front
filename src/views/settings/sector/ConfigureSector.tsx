import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import ColoredButton from "@/components/shared/ColoredButton";
import { useNavigate } from "react-router-dom";
import TableHeader from "@/components/table/TableHeader";
import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";

const ConfigureSector = () => {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <>
      <BaseScreen>
        <div className="flex items-center justify-between">
          <BackButton onClick={() => handleNavigate("/settings")}></BackButton>

          <ColoredButton
            justify="justify-center"
            onClick={() => handleNavigate("/settings/configure-sector/create-sector")}
            color="customYellow"
            width="w-[330px]"
            title="ADICIONAR SETOR"
            icon="fa-solid fa-circle-plus"
          ></ColoredButton>
        </div>

        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle
            marginTop="mt-6"
            title="Configurar Setores"
          ></PageTitle>
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise um setor aqui..."
          ></SearchBar>
        </div>

        <Box
          width="w-[600px] lg:w-[800px] xl:w-[1000px]"
          height="h-[640px]"
          title="Lista de Setores"
          subtitle="Visualização da lista de setores para configuração."
        >
          <TableHeader
            columns={[
              { width: "w-[50%]", content: "NOME" },
              { width: "w-[50%]", content: "DESCRIÇÃO" },
            ]}
          ></TableHeader>

          <div className="h-[80%] overflow-y-auto">
            {/* Aqui você irá adicionar os itens da tabela futuramente */}
          </div>
        </Box>
      </BaseScreen>
    </>
  );
};

export default ConfigureSector;
