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

// API, tipos e utils
import { useReadServices } from "@/hooks/service/useReadServices";
import PaginationControls from "@/components/shared/PaginationControls";
import SectorTag from "@/components/shared/SectorTag";

const ManageServices = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: paginatedServices,
    isLoading: isLoadingServices,
    isError: isErrorServices,
  } = useReadServices(currentPage, debouncedSearchTerm);

  // const { data: formData, isLoading: isLoadingFormData } = useQuery({
  //   queryKey: ["serviceFormData"],
  //   queryFn: getServiceFormData,
  // });

  // const sectorMap = useMemo(() => {
  //   if (!formData?.setores) {
  //     return new Map<number, string>();
  //   }
  //   return new Map(formData.setores.map((s) => [s.id_setor, s.nome_setor]));
  // }, [formData]);

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setToastType(location.state.type || "success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const isLoading = isLoadingServices;

  return (
    <BaseScreen>
      <div className="flex items-center justify-between">
        <BackButton onClick={() => navigate("/configuracoes")} />
        <ColoredButton
          justify="justify-center"
          onClick={() =>
            navigate("/configuracoes/servicos/novo", {
              state: { previousRoute: "/configuracoes/servicos" },
            })
          }
          color="customYellow"
          width="w-[240px]"
          title="ADICIONAR SERVIÇO"
          icon="fa-solid fa-circle-plus"
        />
      </div>

      <div className="flex flex-col lg:justify-between lg:flex-row">
        <PageTitle
          marginTop="mt-6"
          title="Configurar Serviços"
          icon="fa-solid fa-gear"
        />
        <SearchBar
          marginTop="mt-6"
          placeholder="Pesquise um serviço aqui..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <Motion>
        <Box
          width="w-full"
          height="h-[640px]"
          title="Lista de Serviços"
          subtitle="Visualização da lista de serviços para configuração."
        >
          <TableItem
            columns={[
              { width: "30%", content: "NOME DO SERVIÇO" },
              { width: "30%", content: "SETOR" },
              { width: "20%", content: "PONTUAÇÃO" },
              { width: "20%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />
          <div className="h-[350px] overflow-y-auto">
            <ResourceListView
              isLoading={isLoading}
              isError={isErrorServices}
              items={paginatedServices?.data ?? []}
              emptyMessage="Nenhum serviço encontrado."
              errorMessage="Erro ao carregar os serviços."
              renderItem={(service) => (
                <TableItem
                  key={service.id_tipo_servico}
                  columns={[
                    { width: "30%", content: service.nome_servico },
                    {
                      width: "30%",
                      content: <SectorTag sectorName={service.nome_setor} />,
                    },
                    {
                      width: "20%",
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
                            {String(service.pontuacao ?? "0")}
                          </div>
                        </div>
                      ),
                    },
                    {
                      width: "20%",
                      content: (
                        <i
                          className={`fa-solid fa-pencil text-lg text-customYellow`}
                          title="Visualizar / Editar"
                          onClick={() => {
                            navigate(
                              `/configuracoes/servicos/${service.id_tipo_servico}`
                            );
                          }}
                        ></i>
                      ),
                    },
                  ]}
                  itemHeight="h-12"
                  onClick={() =>
                    navigate(
                      `/configuracoes/servicos/${service.id_tipo_servico}`
                    )
                  }
                />
              )}
            />
          </div>
          <PaginationControls
            currentPage={paginatedServices?.current_page ?? 1}
            totalPages={paginatedServices?.last_page ?? 1}
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

export default ManageServices;
