import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "@/views/auth/LoginScreen";
import Dashboard from "@/views/dashboard/DashboardScreen";
import AreaTrabalho from "@/views/workspace/WorkspaceScreen";

// Demandas
import Demandas from "@/views/demands/DemandsScreen";
import DetalhesDemanda from "@/views/demands/DemandDetails";
import CriarDemanda from "@/views/demands/CreateDemand";
import ListarDemandas from "@/views/demands/ListDemands";
import GerenciarDemandas from "@/views/demands/ManageDemands";

// Clientes
import Clientes from "@/views/clients/ClientsScreen";
import DetalhesCliente from "@/views/clients/ClientDetails";
import CriarCliente from "@/views/clients/CreateClient";
import GerenciarClientes from "@/views/clients/ManageClients";

// Colaboradores
import GerenciarColaboradores from "@/views/workers/ManageWorkers";
import CriarColaborador from "@/views/workers/CreateWorker";

// Equipes
import GerenciarEquipes from "@/views/teams/ManageTeams";
import CriarEquipe from "@/views/teams/CreateTeam";

// Setores
import GerenciarSetores from "@/views/sectors/ManageSectors";
import CriarSetor from "@/views/sectors/CreateSector";

// Setores de Negócio
import GerenciarNegocios from "@/views/business/ManageBusiness";
import CriarNegocio from "@/views/business/CreateBusiness";

// Serviços
import GerenciarServicos from "@/views/services/ManageServices";
import CriarServico from "@/views/services/CreateService";

// Relatórios e Configurações gerais
import Relatorios from "@/views/reports/ReportsScreen";
import Configuracoes from "@/views/settings/SettingsScreen";

import { UserProvider } from "@/contexts/UserContext";
import { SideBarProvider } from "@/contexts/SideBarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/views/errors/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/area-trabalho", element: <AreaTrabalho /> },
    { path: "/dashboard", element: <Dashboard /> },

    // Demandas
    { path: "/demandas", element: <Demandas /> },
    { path: "/demandas/nova", element: <CriarDemanda /> },
    { path: "configuracoes/demandas/nova", element: <CriarDemanda /> },

    { path: "/demandas/:id", element: <DetalhesDemanda /> },
    { path: "/demandas/lista", element: <ListarDemandas /> },
    { path: "/configuracoes/demandas", element: <GerenciarDemandas /> },

    // Clientes
    { path: "/clientes", element: <Clientes /> },
    { path: "/clientes/novo", element: <CriarCliente /> },
    { path: "/configuracoes/clientes/novo", element: <CriarCliente /> },

    { path: "/clientes/:id", element: <DetalhesCliente /> },
    { path: "/configuracoes/clientes", element: <GerenciarClientes /> },

    // Colaboradores
    {
      path: "/configuracoes/colaboradores",
      element: <GerenciarColaboradores />,
    },
    {
      path: "/configuracoes/colaboradores/novo",
      element: <CriarColaborador />,
    },

    // Equipes
    { path: "/configuracoes/equipes", element: <GerenciarEquipes /> },
    { path: "/configuracoes/equipes/novo", element: <CriarEquipe /> },

    // Setores
    { path: "/configuracoes/setores", element: <GerenciarSetores /> },
    { path: "/configuracoes/setores/novo", element: <CriarSetor /> },

    // Setores de Negócio
    { path: "/configuracoes/negocios", element: <GerenciarNegocios /> },
    { path: "/configuracoes/negocios/novo", element: <CriarNegocio /> },

    // Serviços
    { path: "/configuracoes/servicos", element: <GerenciarServicos /> },
    { path: "/configuracoes/servicos/novo", element: <CriarServico /> },

    // Relatórios e Configurações gerais
    { path: "/relatorios", element: <Relatorios /> },
    { path: "/configuracoes", element: <Configuracoes /> },

    // Erro 404
    {
      path: "*",element: <NotFound />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SideBarProvider>
          <RouterProvider router={router} />
        </SideBarProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
