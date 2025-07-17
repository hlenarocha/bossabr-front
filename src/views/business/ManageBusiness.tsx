import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReadBusiness } from "@/hooks/business/useReadBusiness";

// Componentes
import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import ColoredButton from "@/components/shared/ColoredButton";
import TableHeader from "@/components/table/TableHeader";
import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import { Motion } from "@/components/animation/Motion";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import TableItem from "@/components/table/TableItem";
import { BusinessItem } from "@/api/businessRoutes";

const ManageBusiness = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: businessSectors, isLoading, isError } = useReadBusiness();
  console.log("Dados recebidos da API (businessSectors):", businessSectors);

  // Verificamos explicitamente se 'businessSectors' é um array antes de usar .filter().
  // Se não for, 'filteredSectors' se torna um array vazio, evitando o erro.
  const filteredSectors = Array.isArray(businessSectors)
    ? businessSectors.filter((sector: BusinessItem) =>
        sector.nome_setor_negocio.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []; // Fallback para um array vazio se não for um array

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return <div className="text-center text-customRedAlert mt-10">Erro ao carregar os setores de negócio.</div>;
    }
    
    if (filteredSectors.length === 0) {
      return <div className="text-center text-gray-400 mt-10">Nenhum setor de negócio encontrado.</div>;
    }

    return filteredSectors.map((sector: BusinessItem) => (
      <TableItem
        key={sector.id_setor_negocio}
        columns={[
          { width: "w-full", content: sector.nome_setor_negocio },
        ]}
        itemWidth="w-full"
        itemHeight="h-12"
        onClick={() => navigate(`/configuracoes/negocios/${sector.id_setor_negocio}`)} // fazer lógica de visualização para update e delete
        icon="fa-solid fa-eye"
      />
    ));
  };

  return (
    <>
      <BaseScreen>
        <div className="flex items-center justify-between">
          <BackButton onClick={() => navigate("/configuracoes")} />
          <ColoredButton
            justify="justify-center"
            onClick={() => navigate("/configuracoes/negocios/novo", { state: { previousRoute: "/configuracoes/negocios" } })}
            color="customYellow"
            width="w-[330px]"
            title="ADICIONAR SETOR DE NEGÓCIO"
            icon="fa-solid fa-circle-plus"
          />
        </div>

        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle marginTop="mt-6" title="Configurar Setores de Negócio" />
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise um setor de negócio aqui..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <Motion>
          <Box
            width="w-full"
            height="h-[640px]"
            title="Lista de Setores de Negócio"
            subtitle="Visualização da lista de setores de negócio para configuração."
          >
            <TableHeader columns={[{ width: "w-full", content: "NOME" }]} />
            <div className="h-[80%] overflow-y-auto">
              {renderContent()}
            </div>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default ManageBusiness;
