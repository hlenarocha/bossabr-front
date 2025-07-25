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
import { BusinessItem } from "@/api/businessRoutes";
import { ResourceListView } from "@/components/shared/ResourceListView";
import Toast from "@/components/shared/Toast";

// utils
import { normalizeString } from "@/utils/normalizeString";

const ManageBusiness = () => {
  const navigate = useNavigate();
  const location = useLocation(); // hook para ler estado da navegação
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const { data: businessSectors, isLoading, isError } = useReadBusiness();

  const normalizedSearchTerm = normalizeString(searchTerm);

  const filteredSectors = Array.isArray(businessSectors)
    ? businessSectors.filter((sector: BusinessItem) =>
        normalizeString(sector.nome_setor_negocio).includes(
          normalizedSearchTerm
        )
      )
    : [];

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
            height="h-[640px]"
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
