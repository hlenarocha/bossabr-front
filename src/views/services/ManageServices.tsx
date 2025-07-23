// hooks e bibliotecas
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
import { ResourceListView } from "@/components/shared/ResourceListView";
import Toast from "@/components/shared/Toast";

// API, tipos e utils
import { getServices, getServiceFormData } from "@/api/serviceRoutes";
import { normalizeString } from "@/utils/normalizeString";

const ManageServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Busca a lista de serviços
  const { data: services, isLoading: isLoadingServices, isError: isErrorServices } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  // Busca os dados do formulário (que contêm os nomes dos setores)
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["serviceFormData"],
    queryFn: getServiceFormData,
  });

  const sectorMap = useMemo(() => {
    if (!formData?.setores) {
      return new Map<number, string>();
    }
    return new Map(formData.setores.map(s => [s.id_setor, s.nome_setor]));
  }, [formData]);

  // Filtra os serviços com base na busca
  const normalizedSearchTerm = normalizeString(searchTerm);
  const filteredServices = services?.filter((service) =>
    normalizeString(service.nome_servico).includes(normalizedSearchTerm)
  ) || [];

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setToastType(location.state.type || "success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const isLoading = isLoadingServices || isLoadingFormData;

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
          <TableHeader columns={[
            { width: "w-1/12", content: "ID" },
            { width: "w-5/12", content: "NOME DO SERVIÇO" },
            { width: "w-4/12", content: "SETOR" },
            { width: "w-2/12", content: "PONTUAÇÃO" },
          ]} />
          <div className="h-[80%] overflow-y-auto">
            <ResourceListView
              isLoading={isLoading}
              isError={isErrorServices}
              items={filteredServices}
              emptyMessage="Nenhum serviço encontrado."
              errorMessage="Erro ao carregar os serviços."
              renderItem={(service) => (
                <TableItem
                  key={service.id_tipo_servico}
                  columns={[
                    { width: "w-1/12", content: String(service.id_tipo_servico) },
                    { width: "w-5/12", content: service.nome_servico },
                    { width: "w-4/12", content: sectorMap.get(service.id_setor) || "Não encontrado" },
                    { width: "w-2/12", content: String(service.pontuacao ?? 'N/A') },
                  ]}
                  itemWidth="w-full"
                  itemHeight="h-12"
                  onClick={() =>
                    navigate(
                      `/configuracoes/servicos/${service.id_tipo_servico}`
                    )
                  }
                  icon="fa-solid fa-pencil"
                />
              )}
            />
          </div>
        </Box>
      </Motion>
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />}
    </BaseScreen>
  );
};

export default ManageServices;
