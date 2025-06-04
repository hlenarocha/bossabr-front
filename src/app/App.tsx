import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/views/LoginScreen";
import Dashboard from "@/views/DashboardScreen";
import Tasks from "@/views/tasks/TasksScreen";
import Clients from "@/views/ClientsScreen";
import Settings from "@/views/settings/SettingsScreen";
import Reports from "@/views/ReportsScreen";
import Workspace from "@/views/workers/WorkspaceScreen";
import CreateTask from "@/views/tasks/CreateTask";
import ConfigureWorker from "@/views/settings/worker/ConfigureWorker";
import CreateWorker from "@/views/settings/worker/CreateWorker";
import { UserProvider } from "@/contexts/UserContext";
import { SideBarProvider } from "@/contexts/SideBarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListTask from "@/views/tasks/ListTask";
import ConfigureTeam from "@/views/settings/team/ConfigureTeam";
import ConfigureSector from "@/views/settings/sector/ConfigureSector";
import ConfigureClient from "@/views/settings/client/ConfigureClient"
import ConfigureBusiness from "@/views/settings/client/ConfigureBusiness";
import ConfigureTask from "@/views/settings/tasks/ConfigureTask";
import ConfigureService from "@/views/settings/service/ConfigureService";

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      // errorElement: <ErrorPage />
    },
    {
      path: "/workspace",
      element: <Workspace />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/tasks",
      element: <Tasks />,
    },
    {
      path: "/tasks/create-task",
      element: <CreateTask />,
    },
    {
      path: "/tasks/list-task",
      element: <ListTask />,
    },
    {
      path: "/clients",
      element: <Clients />,
    },
    {
      path: "/reports",
      element: <Reports />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/settings/configure-worker",
      element: <ConfigureWorker />,
    },
    { 
      path: "/settings/configure-worker/create-worker", 
      element: <CreateWorker /> },
    {
      path: "/settings/configure-team", 
      element: <ConfigureTeam />
    },
    {
      path: "/settings/configure-sector", 
      element: <ConfigureSector />
    },
    {
      path: "/settings/configure-client", 
      element: <ConfigureClient />
    },
    {
      path: "/settings/configure-business", 
      element: <ConfigureBusiness />
    },
    {
      path: "/settings/configure-task", 
      element: <ConfigureTask />

    },
    {
      path: "/settings/configure-service", 
      element: <ConfigureService />

    }
    
  ]);

  return (
    // contexto e QueryClientProvider configurado, envolvendo todo o App
    // possível acessar esse contexto definido (Query, User, SideBar) em toda a aplicação
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
