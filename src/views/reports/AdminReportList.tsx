// hooks e bibliotecas
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import SearchBar from "@/components/shared/SearchBar";
import { Motion } from "@/components/animation/Motion";
import TableItem from "@/components/table/TableItem";
import { ResourceListView } from "@/components/shared/ResourceListView";
import PaginationControls from "@/components/shared/PaginationControls";
import StatusTag from "@/components/shared/StatusTag";

// Hook para buscar a lista de diários
import { useReadDailyReportsList } from "@/hooks/reports/useReadDailyReportsList";

const AdminReportList = () => {
  const navigate = useNavigate();

  // Lógica de paginação e busca
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce para a busca
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reseta para a primeira página a cada nova busca
    }, 500); // Aguarda 500ms após o usuário parar de digitar
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: paginatedReports,
    isLoading,
    isError,
  } = useReadDailyReportsList(currentPage, debouncedSearchTerm);

  return (
    <BaseScreen>
      <div className="flex items-center justify-between">
        <PageTitle
          marginTop="mt-6"
          title="Diário de Atividades"
          icon="fa-solid fa-book"
        />
        <SearchBar
          marginTop="mt-6"
          placeholder="Pesquise um colaborador..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <Motion>
        <Box
          width="w-full"
          height="h-[640px]"
          title="Lista de Colaboradores"
          subtitle="Selecione um colaborador para visualizar o diário."
        >
          <TableItem
            columns={[
              { width: "25%", content: "NOME" },
              { width: "25%", content: "CARGO" },
              { width: "20%", content: "EQUIPE" },
              { width: "15%", content: "PROGRESSO GERAL" },
              { width: "15%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />

          <div className="h-[350px] overflow-y-auto">
            <ResourceListView
              isLoading={isLoading}
              isError={isError}
              items={paginatedReports?.data ?? []}
              emptyMessage="Nenhum colaborador encontrado."
              errorMessage="Erro ao carregar a lista."
              renderItem={(person) => (
                <TableItem
                  key={person.id_pessoa}
                  columns={[
                    {
                      width: "25%",
                      content: `${person.first_name} ${person.last_name}`,
                    },
                    { width: "25%", content: person.cargo },
                    { width: "20%", content: person.nome_equipe },
                    {
                      width: "15%",
                      content: <StatusTag status={person.progresso} />,
                    },
                    {
                      width: "15%",
                      content: (
                        <button
                          onClick={() =>
                            navigate(`/diarios/${person.id_pessoa}`, {
                              state: { from: "/diarios/admin" },
                            })
                          }
                          className="bg-customYellow text-zinc-900 font-bold py-1 px-3 rounded-lg text-sm hover:bg-yellow-400 transition-colors"
                        >
                          <i className="fa-solid fa-eye mr-2"></i>
                          Ver Diário
                        </button>
                      ),
                    },
                  ]}
                  itemHeight="h-12"
                />
              )}
            />
          </div>

          <PaginationControls
            currentPage={paginatedReports?.current_page ?? 1}
            totalPages={paginatedReports?.last_page ?? 1}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
          />
        </Box>
      </Motion>
    </BaseScreen>
  );
};

export default AdminReportList;
