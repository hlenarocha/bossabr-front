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
import PaginationControls from "@/components/shared/PaginationControls";
import Toast from "@/components/shared/Toast";

// API, hook e tipos
import { useReadTeams } from "@/hooks/teams/useReadTeams";
import SectorTag from "@/components/shared/SectorTag";
import TeamTypeTag from "@/components/shared/TeamTypeTag";

const ManageTeams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");


  // SEARCH = nome_equipe, first_name, last_name, nome_setor
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

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setToastType(location.state.type || "success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const isLoading = isLoadingTeams;

  return (
    <>
      <BaseScreen>
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
                          `${team.first_name} ${team.last_name}` ||
                          "Não encontrado",
                      },
                      {
                        width: "10%",
                        content: <TeamTypeTag isInternal={team.equipe_interna}/>,
                      },
                      {
                        width: "25%",
                        content:
                          <SectorTag sectorName={team.nome_setor} /> 
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
