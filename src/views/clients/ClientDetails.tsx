// hooks e bibliotecas
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";
import SearchBar from "@/components/shared/SearchBar";
import TableItem from "@/components/table/TableItem";
import { ResourceListView } from "@/components/shared/ResourceListView";
import StatusTag from "@/components/shared/StatusTag";
import DeadlineDisplay from "@/components/shared/DeadlineDisplay";

// API, hooks e tipos
import { useReadClientById } from "@/hooks/client/useReadClientById";
import { useReadDemandsByClientId } from "@/hooks/demands/useReadDemandsByClientId";
import { DemandByClientItem } from "@/api/demandRoutes";
import SectorTag from "@/components/shared/SectorTag";
import { formatDateToBR } from "@/utils/formatDate";

const ClientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);

  // --- BUSCA DE DADOS ---
  const {
    data: client,
    isLoading: isLoadingClient,
    isError: isErrorClient,
  } = useReadClientById(clientId);
  const {
    data: demands,
    isLoading: isLoadingDemands,
    isError: isErrorDemands,
  } = useReadDemandsByClientId(clientId);

  // --- LÓGICA DE FILTRO E BUSCA PARA A LISTA DE DEMANDAS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDemands, setFilteredDemands] = useState<DemandByClientItem[]>(
    []
  );

  useEffect(() => {
    if (demands) {
      if (!searchTerm) {
        setFilteredDemands(demands);
      } else {
        const lowercasedSearch = searchTerm.toLowerCase();
        const filtered = demands.filter(
          (demand) =>
            demand.nome_servico.toLowerCase().includes(lowercasedSearch) ||
            demand.status.toLowerCase().includes(lowercasedSearch) ||
            demand.nome_setor.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredDemands(filtered);
      }
    }
  }, [searchTerm, demands]);

  //const isLoading = isLoadingClient || isLoadingDemands;

  return (
    <BaseScreen>
      <BackButton
        onClick={() => navigate(location.state?.from || "/clientes")}
      />
      <PageTitle
        marginTop="mt-4"
        icon="fa-solid fa-user-tie"
        title={`Cliente: ${client?.nome_empresa || "Carregando..."}`}
      />

      <Motion>
        <Box
          width="w-full"
          height="h-fit"
          title="Informações do Cliente"
          subtitle="Detalhes de contato e contrato."
        >
          <StatusView isLoading={isLoadingClient} isError={isErrorClient}>
            <>
              {client && (
                <>
                  <InputTitle title="Dados de Contato" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputString
                      title="NOME DA EMPRESA"
                      placeholder={client.nome_empresa}
                      isReadOnly
                      height="h-8"
                    />
                    <InputString
                      title="NOME DO RESPONSÁVEL"
                      placeholder={client.nome_responsavel}
                      isReadOnly
                      height="h-8"
                    />
                    <InputString
                      title="E-MAIL"
                      placeholder={client.email}
                      isReadOnly
                      height="h-8"
                    />
                    <InputString
                      title="TELEFONE"
                      placeholder={client.telefone}
                      isReadOnly
                      height="h-8"
                    />
                    <InputString
                      title="CLASSIFICAÇÃO"
                      placeholder={client.classificacao}
                      isReadOnly
                      height="h-8"
                    />
                  </div>

                  <InputTitle title="Detalhes do Contrato" marginTop="mt-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputString
                      title="DATA DE ENTRADA"
                      placeholder={formatDateToBR(client.data_entrada)}
                      isReadOnly
                      height="h-8"
                    />
                    <InputString
                      title="FIM DO CONTRATO"
                      placeholder={formatDateToBR(client.data_fim_contrato)}
                      isReadOnly
                      height="h-8"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-zinc-400 font-bold text-sm mb-1">
                      DESCRIÇÃO
                    </p>
                    <p className="text-white bg-zinc-800 p-3 rounded-md min-h-[80px]">
                      {client.desc_contrato || "N/A"}
                    </p>
                  </div>
                </>
              )}
            </>
          </StatusView>
        </Box>
      </Motion>

      <Motion>
        <Box
          width="w-full"
          height="h-fit"
          title="Demandas Associadas"
          subtitle="Lista de todas as demandas solicitadas por este cliente."
        >
          <SearchBar
            placeholder="Pesquise por serviço, status ou setor..."
            value={searchTerm}
            onChange={(value: string) => setSearchTerm(value)}
          />

          <TableItem
            columns={[
              { width: "25%", content: "SERVIÇO" },
              { width: "20%", content: "SETOR" },
              { width: "20%", content: "PRAZO" },
              { width: "20%", content: "STATUS" },
              { width: "15%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />

          <div className="h-[300px] overflow-y-auto">
            <ResourceListView
              isLoading={isLoadingDemands}
              isError={isErrorDemands}
              items={filteredDemands}
              emptyMessage="Nenhuma demanda encontrada para este cliente."
              errorMessage="Erro ao carregar as demandas."
              renderItem={(demand) => (
                <TableItem
                  key={demand.id_demanda}
                  columns={[
                    { width: "25%", content: demand.nome_servico },
                    {
                      width: "20%",
                      content: <SectorTag sectorName={demand.nome_setor} />,
                    },
                    {
                      width: "20%",
                      content: <DeadlineDisplay prazo={demand.prazo} />,
                    },
                    {
                      width: "20%",
                      content: <StatusTag status={demand.status} />,
                    },
                    {
                      width: "15%",
                      content: (
                        <button
                          onClick={() =>
                            navigate(`/demandas/${demand.id_demanda}`, {
                              state: { from: "/clientes/:id" },
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
                />
              )}
            />
          </div>
        </Box>
      </Motion>
    </BaseScreen>
  );
};

export default ClientDetails;
