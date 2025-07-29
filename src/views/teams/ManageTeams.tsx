// hooks e bibliotecas
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
import PaginationControls from "@/components/shared/PaginationControls";
import Toast from "@/components/shared/Toast";

// API, hook e tipos
import { useReadTeams } from "@/hooks/teams/useReadTeams";
import { getTeamFormData } from "@/api/teamRoutes";

const ManageTeams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: paginatedTeams,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
  } = useReadTeams(currentPage, debouncedSearchTerm);

  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["teamFormData"],
    queryFn: getTeamFormData,
  });

  const responsibleMap = useMemo(() => {
    if (!formData?.pessoas) return new Map<number, string>();
    return new Map(formData.pessoas.map((p) => [p.id_pessoa, p.first_name]));
  }, [formData]);

  const sectorMap = useMemo(() => {
    if (!formData?.setores) return new Map<number, string>();
    return new Map(formData.setores.map((s) => [s.id_setor, s.nome_setor]));
  }, [formData]);

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setToastType(location.state.type || "success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const isLoading = isLoadingTeams || isLoadingFormData;

  return (
    <>
      <BaseScreen>
        {/* ... Código do topo da página (botões e título) ... */}
        <div className="flex items-center justify-between">
          <BackButton onClick={() => navigate("/configuracoes")} />
          <ColoredButton
            justify="justify-center"
            onClick={() =>
              navigate("/configuracoes/equipes/novo", {
                state: { previousRoute: "/configuracoes/equipes" },
              })
            }
            color="customYellow"
            width="w-[330px]"
            title="ADICIONAR EQUIPE"
            icon="fa-solid fa-circle-plus"
          />
        </div>

        <div className="flex flex-col lg:justify-between lg:flex-row">
          <PageTitle
            marginTop="mt-6"
            title="Configurar Equipes"
            icon="fa-solid fa-users"
          />
          <SearchBar
            marginTop="mt-6"
            placeholder="Pesquise uma equipe aqui..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <Motion>
          <Box
            width="w-full"
            height="h-[640px]"
            title="Lista de Equipes"
            subtitle="Visualização da lista de equipes para configuração."
          >
            <TableItem
              columns={[
                { width: "30%", content: "NOME DA EQUIPE" },
                { width: "20%", content: "RESPONSÁVEL" },
                { width: "10%", content: "TIPO" },

                { width: "25%", content: "SETOR" },
                { width: "15%", content: "AÇÕES" },
              ]}
              isTableHeader={true}
              itemHeight="h-12"
            />

            <div className="h-[350px] overflow-y-auto">
              <ResourceListView
                isLoading={isLoading}
                isError={isErrorTeams}
                items={paginatedTeams?.data ?? []}
                emptyMessage="Nenhuma equipe encontrada."
                errorMessage="Erro ao carregar as equipes."
                renderItem={(team) => (
                  <TableItem
                    key={team.id_equipe}
                    columns={[
                      { width: "30%", content: team.nome_equipe },
                      {
                        width: "20%",
                        content:
                          responsibleMap.get(Number(team.responsavel_equipe)) ||
                          "Não encontrado",
                      },
                      {
                        width: "10%",
                        content: team.equipe_interna ? "Interna" : "Externa",
                      },
                      {
                        width: "25%",
                        content:
                          sectorMap.get(Number(team.id_equipe)) ||
                          "Não encontrado",
                      },
                      {
                        width: "15%",
                        content: (
                          <i
                            className="fa-solid fa-pencil text-lg text-customYellow hover:cursor-pointer"
                            title="Visualizar / Editar"
                            onClick={() =>
                              navigate(
                                `/configuracoes/equipes/${team.id_equipe}`
                              )
                            }
                          ></i>
                        ),
                      },
                    ]}
                    itemHeight="h-12"
                    onClick={() =>
                      navigate(`/configuracoes/equipes/${team.id_equipe}`)
                    }
                  />
                )}
              />
            </div>

            <PaginationControls
              currentPage={paginatedTeams?.current_page ?? 1}
              totalPages={paginatedTeams?.last_page ?? 1}
              onPageChange={setCurrentPage}
              isLoading={isLoading}
            />
          </Box>
        </Motion>
        {/* <-- ADICIONADO: Componente Toast --> */}
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

export default ManageTeams;
