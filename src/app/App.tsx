import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../screens/LoginScreen";
import Dashboard from "../screens/DashboardScreen";
import Tasks from "../screens/tasks/TasksScreen";
import Clients from "../screens/ClientsScreen";
import Settings from "../screens/settings/SettingsScreen";
import Reports from "../screens/ReportsScreen";
import Workspace from "../screens/WorkspaceScreen";
import CreateTask from "../screens/tasks/CreateTask";
import ConfigureWorker from "../screens/settings/worker/ConfigureWorker";
import CreateWorker from "../screens/settings/worker/CreateWorker";
import { UserProvider } from "../contexts/UserContext";
import { SideBarProvider } from "../contexts/SideBarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      element: <CreateWorker />,
    },
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
    </QueryClientProvider>  );
};

export default App;
