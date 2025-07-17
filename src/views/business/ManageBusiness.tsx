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
import TableItem from "@/components/table/TableItem";
import { BusinessItem } from "@/api/businessRoutes";

import { ResourceListView } from "@/components/shared/ResourceListView";
import { normalizeString } from "@/utils/normalizeString";

const ManageBusiness = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: businessSectors, isLoading, isError } = useReadBusiness();

  const normalizedSearchTerm = normalizeString(searchTerm);

  const filteredSectors = Array.isArray(businessSectors)
    ? businessSectors.filter((sector: BusinessItem) =>
        normalizeString(sector.nome_setor_negocio).includes(
          normalizedSearchTerm
        )
      )
    : [];

  return (
    <>
      <BaseScreen>
        <div className="flex items-center justify-between">
          <BackButton onClick={() => navigate("/configuracoes")} />
          <ColoredButton
            justify="justify-center"
            onClick={() =>
              navigate("/configuracoes/negocios/novo", {
                state: { previousRoute: "/configuracoes/negocios" },
              })
            }
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
              <ResourceListView
                isLoading={isLoading}
                isError={isError}
                items={filteredSectors}
                // emptyMessage="Nenhum setor de negócio encontrado."
                // errorMessage="Erro ao carregar os setores."
                renderItem={(sector) => (
                  <TableItem
                    key={sector.id_setor_negocio}
                    columns={[
                      { width: "w-full", content: sector.nome_setor_negocio },
                    ]}
                    itemWidth="w-full"
                    itemHeight="h-12"
                    onClick={() =>
                      navigate(
                        `/configuracoes/negocios/${sector.id_setor_negocio}`
                      )
                    }
                    icon="fa-solid fa-eye"
                  />
                )}
              />
            </div>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default ManageBusiness;
