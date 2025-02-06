import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../screens/LoginScreen";
import Dashboard from "../screens/DashboardScreen";
import Tasks from "../screens/TasksScreen";
import Clients from "../screens/ClientsScreen";
import Settings from "../screens/SettingsScreen";
import Workspace from "../screens/WorkspaceScreen";

// mudar para CREATE BROWSER ROUTER. Estudar Outlet

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
      /* children: [
        { }
      ] */
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      /* children: [
        { }
      ] */
    },
    {
      path: "/tasks",
      element: <Tasks />,
    },
    {
      path: "/clients",
      element: <Clients />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
