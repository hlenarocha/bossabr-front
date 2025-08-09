// hooks e bibliotecas
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import TableItem from "@/components/table/TableItem";
import SearchBar from "@/components/shared/SearchBar";
import ColoredButton from "@/components/shared/ColoredButton";
import { Motion } from "@/components/animation/Motion";
import { ResourceListView } from "@/components/shared/ResourceListView";
import StatusTag from "@/components/shared/StatusTag";

// Hook e tipos
import { useReadClientList } from "@/hooks/client/useReadClientList";

const ClientsScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // RETIRAR DEPOIS
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce para a busca
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: clients, isLoading, isError } = useReadClientList(debouncedSearchTerm);

  return (
    <BaseScreen>
      <div className="flex w-full justify-end">
        <ColoredButton
          justify="justify-center"
          onClick={() => navigate("/clientes/novo", { state: { previousRoute: "/clientes" } })}
          color="customYellow"
          width="w-[300px]"
          title="ADICIONAR CLIENTE"
          icon="fa-solid fa-circle-plus"
        />
      </div>

      <div className="flex flex-col lg:justify-between lg:flex-row">
        <PageTitle icon="fa-solid fa-user-tie" marginTop="mt-4" title="Clientes" />
        <SearchBar
          marginTop="mt-6"
          placeholder="Pesquise um cliente aqui..."
          value={searchTerm}
          onChange={(value: string) => setSearchTerm(value)}
        />
      </div>

      <div className="mt-4">
        <Motion>
          <Box
            title="Lista de Clientes"
            subtitle="Visualização da lista de clientes com base no progresso geral das tarefas."
            width="w-full"
            height="h-fit"
          >
            <TableItem
              columns={[
                { width: "25%", content: "NOME DA EMPRESA" },
                { width: "30%", content: "SERVIÇOS CONTRATADOS" },
                { width: "20%", content: "SETORES ENVOLVIDOS" },
                { width: "15%", content: "PROGRESSO GERAL" },
                { width: "10%", content: "AÇÕES" },
              ]}
              isTableHeader={true}
              itemHeight="h-12"
            />

            <div className="h-[450px] overflow-y-auto">
              <ResourceListView
                isLoading={isLoading}
                isError={isError}
                items={clients ?? []}
                emptyMessage="Nenhum cliente encontrado."
                errorMessage="Erro ao carregar os clientes."
                renderItem={(client) => (
                  <TableItem
                    key={client.id_cliente}
                    columns={[
                      { width: "25%", content: client.nome_empresa },
                      { width: "30%", content: client.servicos.join(', ') },
                      { width: "20%", content: client.setores.join(', ') },
                      { width: "15%", content: <StatusTag status={client.progresso_geral} /> },
                      {
                        width: "10%",
                        content: (
                          <button
                          onClick={() =>
                            navigate(`/clientes/${client.id_cliente}`, {
                              state: { from: "/clientes" },
                            })
                          }
                          className="bg-customYellow text-zinc-900 font-bold py-1 px-3 rounded-lg text-sm hover:bg-yellow-400 transition-colors"
                        >
                          <i className="fa-solid fa-eye mr-2"></i>
                          Ver Cliente
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
      </div>
    </BaseScreen>
  );
};

export default ClientsScreen;
