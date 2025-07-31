// hooks e bibliotecas
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import { formatDateToBR } from "@/utils/formatDate";
// API, hook e tipos
import { useReadDemands } from "@/hooks/demands/useReadDemands";

const ManageDemands = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados de controle da tela
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Debounce para a busca
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Busca a lista de demandas de forma paginada
  const {
    data: paginatedDemands,
    isLoading,
    isError,
  } = useReadDemands(currentPage, debouncedSearchTerm);

  // Efeito para exibir o toast
  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setToastType(location.state.type || "success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <BaseScreen>
      <div className="flex items-center justify-between">
        <BackButton onClick={() => navigate("/configuracoes")} />
        <ColoredButton
          justify="justify-center"
          onClick={() =>
            navigate("/demandas/nova", {
              state: { previousRoute: "/configuracoes/demandas" },
            })
          }
          color="customYellow"
          width="w-[330px]"
          title="ADICIONAR DEMANDA"
          icon="fa-solid fa-circle-plus"
        />
      </div>

      <div className="flex flex-col lg:justify-between lg:flex-row">
        <PageTitle
          marginTop="mt-6"
          title="Configurar Demandas"
          icon="fa-solid fa-list-check"
        />
        <SearchBar
          marginTop="mt-6"
          placeholder="Pesquise uma demanda aqui..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <Motion>
        <Box
          width="w-full"
          height="h-[640px]"
          title="Lista de Demandas"
          subtitle="Visualização de todas as demandas cadastradas."
        >
          {/* --- COLUNAS DO CABEÇALHO ATUALIZADAS --- */}
          <TableItem
            columns={[
              { width: "25%", content: "NOME DA DEMANDA" },
              // { width: "20%", content: "DESCRIÇÃO" },
              { width: "25%", content: "ATUAL RESPONSÁVEL" },
              { width: "10%", content: "QTD." },
              { width: "15%", content: "STATUS" },

              { width: "15%", content: "PRAZO" },
              { width: "10%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />

          <div className="h-[350px] overflow-y-auto">
            <ResourceListView
              isLoading={isLoading}
              isError={isError}
              items={paginatedDemands?.data ?? []}
              emptyMessage="Nenhuma demanda encontrada."
              errorMessage="Erro ao carregar as demandas."
              renderItem={(demand) => (
                <TableItem
                  key={demand.id_demanda}
                  columns={[
                    {
                      width: "25%",
                      content:
                        demand.id_tipo_servico + " - " + demand.id_cliente,
                    },
                    // { width: "20%", content: demand.descricao || "N/A" },
                    { width: "25%", content: demand.id_pessoa },
                    {
                      width: "10%",
                      content: (
                        <div className="flex justify-center items-center">
                          <div
                            className="
                              w-8 h-8
                              rounded-full
                              bg-zinc-700
                              text-white
                              flex items-center justify-center
                              font-bold text-sm
                              shadow-md
                            "
                          >
                            {String(demand.quantidade)}
                          </div>
                        </div>
                      ),
                      // isNumber: true,
                    },
                    { width: "15%", content: demand.id_status },
                    { width: "15%", content: formatDateToBR(demand.prazo) },
                    {
                      width: "10%",
                      content: (
                        <i
                          className="fa-solid fa-pencil text-lg text-customYellow hover:cursor-pointer"
                          title="Visualizar / Editar"
                          onClick={() =>
                            navigate(`/configuracoes/demandas/${demand.id_demanda}`)
                          }
                        ></i>
                      ),
                    },
                  ]}
                  itemHeight="h-12"
                  onClick={() =>
                    navigate(`/configuracoes/demandas/${demand.id_demanda}`)
                  }
                />
              )}
            />
          </div>

          <PaginationControls
            currentPage={paginatedDemands?.current_page ?? 1}
            totalPages={paginatedDemands?.last_page ?? 1}
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
  );
};

export default ManageDemands;
