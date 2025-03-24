import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../screens/LoginScreen";
import Dashboard from "../screens/DashboardScreen";
import Tasks from "../screens/tasks/TasksScreen";
import Clients from "../screens/ClientsScreen";
import Settings from "../screens/settings/SettingsScreen";
import Workspace from "../screens/WorkspaceScreen";
import CreateTask from "../screens/tasks/CreateTask";
import ConfigureWorker from "../screens/settings/ConfigureWorker";
import CreateWorker from "../screens/settings/CreateWorker";
import { UserProvider } from "../contexts/UserContext";

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
    // contexto configurado, evolvendo todo o App
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
};

export default App;
