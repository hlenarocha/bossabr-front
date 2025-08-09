// hooks e bibliotecas
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Componentes
import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import { Motion } from "@/components/animation/Motion";
import TableItem from "@/components/table/TableItem";
import { ResourceListView } from "@/components/shared/ResourceListView";
import Toast from "@/components/shared/Toast";
import PaginationControls from "@/components/shared/PaginationControls";
import StatusTag from "@/components/shared/StatusTag";
import DeadlineDisplay from "@/components/shared/DeadlineDisplay"; 
import { useReadDemands } from "@/hooks/demands/useReadDemands";

const ListDemands = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Busca a lista de demandas de forma paginada (reutilizando o mesmo hook)
  const {
    data: paginatedDemands,
    isLoading,
    isError,
  } = useReadDemands(currentPage, debouncedSearchTerm);

  // Efeito para exibir o toast (pode ser útil se houver ações futuras)
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
        <BackButton onClick={() => navigate("/demandas")} />
        {/* O botão de adicionar pode ser removido ou apontar para a rota correta se necessário */}
      </div>

      <div className="flex flex-col lg:justify-between lg:flex-row">
        <PageTitle
          marginTop="mt-6"
          title="Lista de Demandas"
          icon="fa-solid fa-list-check"
        />
        <SearchBar
          marginTop="mt-6"
          placeholder="Pesquise uma demanda aqui..."
          value={searchTerm}
          onChange={(value: string) => setSearchTerm(value)}
        />
      </div>
      <Motion>
        <Box
          width="w-full"
          height="h-[640px]"
          title="Todas as Demandas"
          subtitle="Visualização de todas as demandas cadastradas na agência."
        >
          <TableItem
            columns={[
              { width: "25%", content: "NOME DA DEMANDA" },
              { width: "20%", content: "ATUAL RESPONSÁVEL" },
              { width: "10%", content: "QTD." },
              { width: "15%", content: "STATUS" },
              { width: "15%", content: "PRAZO" },
              { width: "15%", content: "AÇÕES" },
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
                      content: demand.nome_servico,
                    },
                    {
                      width: "20%",
                      content: `${demand.first_name} ${demand.last_name}`,
                    },
                    {
                      width: "10%",
                      content: (
                        <div className="flex justify-center items-center">
                          <div
                            className="
                              w-10 h-10
                              rounded-full
                              bg-zinc-800
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
                    },
                    {
                      width: "15%",
                      content: <StatusTag status={demand.status} />,
                    },
                    {
                      width: "15%",
                      content: <DeadlineDisplay prazo={demand.prazo} />,
                    },
                    {
                      width: "15%",
                      content: (
                        <button
                        onClick={() =>
                          navigate(`/demandas/${demand.id_demanda}`, {
                            state: { from: "/demandas/lista" },
                          })
                        }
                        className="bg-customYellow text-zinc-900 font-bold py-1 px-3 rounded-lg text-sm hover:bg-yellow-400 transition-colors"
                      >
                        <i className="fa-solid fa-eye mr-2"></i>
                        Ver Demanda
                      </button>
                      ),
                    },
                  ]}
                  itemHeight="h-12"
                  onClick={() =>
                    navigate(`/demandas/${demand.id_demanda}`)
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

export default ListDemands;
