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

// API, hook e tipos
import { useReadWorkers } from "@/hooks/worker/useReadWorkers"; // Supondo que você criou este hook
import SectorTag from "@/components/shared/SectorTag";

const ManageWorkers = () => {
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

  // Busca a lista de colaboradores paginada (AGORA É A ÚNICA CHAMADA DE API NECESSÁRIA)
  const {
    data: paginatedWorkers,
    isLoading, // Não precisamos mais combinar múltiplos loadings
    isError,
  } = useReadWorkers(currentPage, debouncedSearchTerm);

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
            navigate("/configuracoes/colaboradores/novo", {
              state: { previousRoute: "/configuracoes/colaboradores" },
            })
          }
          color="customYellow"
          width="w-[330px]"
          title="ADICIONAR COLABORADOR"
          icon="fa-solid fa-circle-plus"
        />
      </div>

      <div className="flex flex-col lg:justify-between lg:flex-row">
        <PageTitle
          icon="fa-solid fa-id-badge"
          marginTop="mt-6"
          title="Configurar Colaboradores"
        />
        <SearchBar
          marginTop="mt-6"
          placeholder="Pesquise um colaborador aqui..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <Motion>
        <Box
          width="w-full"
          height="h-[640px]"
          title="Lista de Colaboradores"
          subtitle="Visualização da lista de colaboradores para configuração."
        >
          <TableItem
            columns={[
              { width: "25%", content: "NOME" },
              { width: "20%", content: "CARGO" },
              { width: "20%", content: "EQUIPE" },
              { width: "20%", content: "SETOR" },
              { width: "15%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />

          <div className="h-[350px] overflow-y-auto">
            <ResourceListView
              isLoading={isLoading}
              isError={isError}
              items={paginatedWorkers?.data ?? []}
              emptyMessage="Nenhum colaborador encontrado."
              errorMessage="Erro ao carregar os colaboradores."
              renderItem={(worker) => (
                <TableItem
                  key={worker.id_pessoa}
                  columns={[
                    {
                      width: "25%",
                      content: `${worker.first_name} ${worker.last_name || ""}`,
                    },
                    { width: "20%", content: worker.cargo },
                    { width: "20%", content: worker.nome_equipe },
                    {
                      width: "20%",
                      content: <SectorTag sectorName={worker.nome_setor} />,
                    },
                    {
                      width: "15%",
                      content: (
                        <i
                          className="fa-solid fa-pencil text-lg text-customYellow hover:cursor-pointer"
                          title="Visualizar / Editar"
                          onClick={() =>
                            navigate(
                              `/configuracoes/colaboradores/${worker.id_pessoa}`
                            )
                          }
                        ></i>
                      ),
                    },
                  ]}
                  itemHeight="h-12"
                  onClick={() =>
                    navigate(`/configuracoes/colaboradores/${worker.id_pessoa}`)
                  }
                />
              )}
            />
          </div>

          <PaginationControls
            currentPage={paginatedWorkers?.current_page ?? 1}
            totalPages={paginatedWorkers?.last_page ?? 1}
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

export default ManageWorkers;
