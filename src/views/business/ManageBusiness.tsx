import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReadBusiness } from "@/hooks/business/useReadBusiness";

// Componentes
import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import ColoredButton from "@/components/shared/ColoredButton";
import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import { Motion } from "@/components/animation/Motion";
import TableItem from "@/components/table/TableItem";
import { ResourceListView } from "@/components/shared/ResourceListView";
import Toast from "@/components/shared/Toast";
import PaginationControls from "@/components/shared/PaginationControls";

const ManageBusiness = () => {
  const navigate = useNavigate();
  const location = useLocation(); // hook para ler estado da navegação

  // toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // const { data: businessSectors, isLoading, isError } = useReadBusiness();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const normalizedSearchTerm = normalizeString(searchTerm);

  // const filteredSectors = Array.isArray(businessSectors)
  //   ? businessSectors.filter((sector: BusinessItem) =>
  //       normalizeString(sector.nome_setor_negocio).includes(
  //         normalizedSearchTerm
  //       )
  //     )
  //   : [];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Volta para a página 1 em uma nova busca
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // hook agora chamado com a página e a busca
  const {
    data: paginatedData,
    isLoading,
    isError,
  } = useReadBusiness(currentPage, debouncedSearchTerm);

  // Exibe mensagem de toast se houver ele na navegação
  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setToastType(location.state.type || "success");
      // Limpa o estado para não exibir toast novamente
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

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
          <PageTitle
            marginTop="mt-6"
            title="Configurar Setores de Negócio"
            icon="fa-solid fa-gear"
          />
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
            height="h-fit"
            title="Lista de Setores de Negócio"
            subtitle="Visualização da lista de setores de negócio para configuração."
          >
            <TableItem
              columns={[
                { width: "90%", content: "NOME" },
                { width: "10%", content: "AÇÕES" },
              ]}
              isTableHeader={true}
              itemHeight="h-12"
            />
            <div className="h-[350px] overflow-y-auto">
              <ResourceListView
                isLoading={isLoading}
                isError={isError}
                // paginatedData
                items={paginatedData?.data ?? []}
                
                renderItem={(sector) => (
                  <TableItem
                    key={sector.id_setor_negocio}
                    columns={[
                      { width: "90%", content: sector.nome_setor_negocio },
                      {
                        width: "10%",
                        content: (
                          <i
                            className={`fa-solid fa-pencil text-lg text-customYellow hover:cursor-pointer`}
                            title="Visualizar / Editar"
                            onClick={() =>
                              navigate(
                                `/configuracoes/negocios/${sector.id_setor_negocio}`
                              )
                            }
                          ></i>
                        ),
                      },
                    ]}
                    itemWidth="w-full"
                    itemHeight="h-12"
                    onClick={() =>
                      navigate(
                        `/configuracoes/negocios/${sector.id_setor_negocio}`
                      )
                    }
                    icon="fa-solid fa-pencil"
                  />
                )}
              />
            </div>
            <PaginationControls
              currentPage={paginatedData?.current_page ?? 1}
              totalPages={paginatedData?.last_page ?? 1}
              onPageChange={setCurrentPage}
              isLoading={isLoading}
            />
          </Box>
        </Motion>
        {toastMessage && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage(null)}
          />
        )}
      </BaseScreen>
    </>
  );
};

export default ManageBusiness;
