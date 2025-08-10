import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useContext, useEffect } from "react";

// Providers de Contexto
import { UserProvider, UserContext } from "@/contexts/UserContext";
import { SideBarProvider } from "@/contexts/SideBarContext";

// Lógica da API e Interfaces
import readWorkspace from "@/api/workspaceRoutes";

// Telas Principais
import LoginScreen from "@/views/auth/LoginScreen";
import Dashboard from "@/views/dashboard/DashboardScreen";
import AreaTrabalho from "@/views/workspace/WorkspaceScreen";
import Configuracoes from "@/views/settings/SettingsScreen";
import NotFound from "@/views/errors/NotFound";

// Telas de Diario
import Diario from "@/views/reports/DailyReportScreen";
import ListaDiariosAdmin from "@/views/reports/AdminReportList";

// Telas de Demandas
import Demandas from "@/views/demands/DemandsScreen";
import DetalhesDemanda from "@/views/demands/DemandDetails";
import CriarDemanda from "@/views/demands/CreateDemand";
import ListarDemandas from "@/views/demands/ListDemands";
import GerenciarDemandas from "@/views/demands/ManageDemands";
import EditarDemanda from "@/views/demands/EditDemand";

// Telas de Clientes
import Clientes from "@/views/clients/ClientsScreen";
import DetalhesCliente from "@/views/clients/ClientDetails";
import CriarCliente from "@/views/clients/CreateClient";
import GerenciarClientes from "@/views/clients/ManageClients";
import EditarCliente from "@/views/clients/EditClient";


// Telas de Colaboradores
import GerenciarColaboradores from "@/views/workers/ManageWorkers";
import CriarColaborador from "@/views/workers/CreateWorker";
import EditarColaborador from "@/views/workers/EditWorker"


// Telas de Equipes
import GerenciarEquipes from "@/views/teams/ManageTeams";
import CriarEquipe from "@/views/teams/CreateTeam";
import EditarEquipe from "@/views/teams/EditTeam";

// Telas de Setores
import GerenciarSetores from "@/views/sectors/ManageSectors";
import CriarSetor from "@/views/sectors/CreateSector";

// Telas de Setores de Negócio
import GerenciarNegocios from "@/views/business/ManageBusiness";
import CriarNegocio from "@/views/business/CreateBusiness";
import EditarNegocio from "@/views/business/EditBusiness";

// Telas de Serviços
import GerenciarServicos from "@/views/services/ManageServices";
import CriarServico from "@/views/services/CreateService";
import EditarServico from "@/views/services/EditService";

const queryClient = new QueryClient();

const AppContainer = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user && !user.nome_equipe) {
      const fetchEssentialData = async () => {
        try {
          const data = await readWorkspace(user.id_pessoa);
          if (data && data.dadosEssenciais) {
            setUser((prevUser) => {
              if (!prevUser) return null;
              return {
                ...prevUser,
                nome_equipe: data.dadosEssenciais.nome_equipe,
                nome_setor: data.dadosEssenciais.nome_setor,
              };
            });
          }
        } catch (error) {
          console.error("Erro ao buscar dados essenciais do usuário", error);
        }
      };
      fetchEssentialData();
    }
  }, [user, setUser]);

  const router = createBrowserRouter([
    { path: "/", element: <LoginScreen /> },
    { path: "/area-trabalho", element: <AreaTrabalho /> },
    { path: "/dashboard", element: <Dashboard /> },

    // Demandas
    { path: "/demandas", element: <Demandas /> },
    { path: "/demandas/nova", element: <CriarDemanda /> },
    { path: "/configuracoes/demandas/nova", element: <CriarDemanda /> },
    { path: "/demandas/:id", element: <DetalhesDemanda /> },

    { path: "/demandas/lista", element: <ListarDemandas /> },
    { path: "/configuracoes/demandas", element: <GerenciarDemandas /> },
    { path: "/configuracoes/demandas/:id", element: <EditarDemanda /> },

    // Clientes
    { path: "/clientes", element: <Clientes /> },
    { path: "/clientes/novo", element: <CriarCliente /> },
    { path: "/configuracoes/clientes/novo", element: <CriarCliente /> },
    { path: "/clientes/:id", element: <DetalhesCliente /> },
    { path: "/configuracoes/clientes", element: <GerenciarClientes /> },
    { path: "configuracoes/clientes/:id", element: <EditarCliente /> },

    // Colaboradores
    {
      path: "/configuracoes/colaboradores",
      element: <GerenciarColaboradores />,
    },
    {
      path: "/configuracoes/colaboradores/novo",
      element: <CriarColaborador />,
    },
    {
      path: "/configuracoes/colaboradores/:id",
      element: <EditarColaborador />,
    },

    // Equipes
    { path: "/configuracoes/equipes", element: <GerenciarEquipes /> },
    { path: "/configuracoes/equipes/novo", element: <CriarEquipe /> },
    { path: "/configuracoes/equipes/:id", element: <EditarEquipe /> },

    // Setores
    { path: "/configuracoes/setores", element: <GerenciarSetores /> },
    { path: "/configuracoes/setores/novo", element: <CriarSetor /> },

    // Setores de Negócio
    { path: "/configuracoes/negocios", element: <GerenciarNegocios /> },
    { path: "/configuracoes/negocios/novo", element: <CriarNegocio /> },
    { path: "/configuracoes/negocios/:id", element: <EditarNegocio /> },

    // Serviços
    { path: "/configuracoes/servicos", element: <GerenciarServicos /> },
    { path: "/configuracoes/servicos/novo", element: <CriarServico /> },
    { path: "/configuracoes/servicos/:id", element: <EditarServico /> },

    // Relatórios e Configurações gerais
    { path: "/diarios/:id", element: <Diario /> },
    { path: "/diarios", element: <ListaDiariosAdmin /> },
    { path: "/configuracoes", element: <Configuracoes /> },

    // Rota para página não encontrada (404)
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
};

const App = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    return (
      <div
        style={{
          padding: "2rem",
          fontFamily: "sans-serif",
          color: "red",
          textAlign: "center",
        }}
      >
        <h1>Erro de Configuração</h1>
        <p>
          A variável VITE_GOOGLE_CLIENT_ID não foi encontrada. Verifique seu
          arquivo .env
        </p>
      </div>
    );
  }

  return (
    // provedores que fornecerão contexto para toda a aplicação
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <UserProvider>
          <SideBarProvider>
            <AppContainer />
          </SideBarProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
