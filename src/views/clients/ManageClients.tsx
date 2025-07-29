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
import Toast from "@/components/shared/Toast";
import PaginationControls from "@/components/shared/PaginationControls";

// API, hook e tipos
import { useReadClients } from "@/hooks/client/useReadClients";
import { getClientFormData } from "@/api/clientRoutes";

const ManageClients = () => {
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

  // Busca a lista de clientes de forma paginada
  const { 
    data: paginatedClients, 
    isLoading: isLoadingClients, 
    isError: isErrorClients 
  } = useReadClients(currentPage, debouncedSearchTerm);

  // Busca os dados de apoio (setores de negócio) para exibir os nomes
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["clientFormData"],
    queryFn: getClientFormData,
  });

  // Cria um mapa para buscar o nome do setor de negócio por ID
  const businessSectorMap = useMemo(() => {
    if (!formData?.setoresNegocio) return new Map<number, string>();
    return new Map(formData.setoresNegocio.map((s) => [s.id_setor_negocio, s.nome_setor_negocio]));
  }, [formData]);

  // Efeito para exibir o toast
  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setToastType(location.state.type || "success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const isLoading = isLoadingClients || isLoadingFormData;

  return (
    <BaseScreen>
      <div className="flex items-center justify-between">
        <BackButton onClick={() => navigate("/configuracoes")} />
        <ColoredButton
          justify="justify-center"
          onClick={() => navigate("/configuracoes/clientes/novo", { state: { previousRoute: "/configuracoes/clientes" } })}
          color="customYellow"
          width="w-[330px]"
          title="ADICIONAR CLIENTE"
          icon="fa-solid fa-circle-plus"
        />
      </div>

      <div className="flex flex-col lg:justify-between lg:flex-row">
        <PageTitle
          marginTop="mt-6"
          title="Configurar Clientes"
          icon="fa-solid fa-user-tie"
        />
        <SearchBar
          marginTop="mt-6"
          placeholder="Pesquise um cliente aqui..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <Motion>
        <Box
          width="w-full"
          height="h-[640px]"
          title="Lista de Clientes"
          subtitle="Visualização da lista de clientes para configuração."
        >
          <TableItem
            columns={[
              { width: "25%", content: "NOME" },
              { width: "25%", content: "RESPONSÁVEL" },
              { width: "25%", content: "SETOR DE NEGÓCIO" },
              { width: "10%", content: "ATIVO" },
              { width: "15%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />
          
          <div className="h-[75%] overflow-y-auto">
            <ResourceListView
              isLoading={isLoading}
              isError={isErrorClients}
              items={paginatedClients?.data ?? []}
              emptyMessage="Nenhum cliente encontrado."
              errorMessage="Erro ao carregar os clientes."
              renderItem={(client) => (
                <TableItem
                  key={client.id_cliente}
                  columns={[
                    { width: "25%", content: client.nome_empresa },
                    { width: "25%", content: client.nome_responsavel },
                    { width: "25%", content: businessSectorMap.get(client.id_setor_negocio) || "Não encontrado" },
                    { width: "10%", content: client.ativo ? "Sim" : "Não" },
                    { width: "15%", content: ( <i className="fa-solid fa-pencil text-lg text-customYellow hover:cursor-pointer" title="Visualizar / Editar" onClick={() => navigate(`/configuracoes/clientes/${client.id_cliente}`)} ></i> )},
                  ]}
                  itemHeight="h-12"
                />
              )}
            />
          </div>

          <PaginationControls
            currentPage={paginatedClients?.current_page ?? 1}
            totalPages={paginatedClients?.last_page ?? 1}
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

export default ManageClients;
