import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../screens/LoginScreen";
import Dashboard from "../screens/DashboardScreen";
import Tasks from "../screens/tasks/TasksScreen";
import Clients from "../screens/ClientsScreen";
import Settings from "../screens/SettingsScreen";
import Workspace from "../screens/WorkspaceScreen";
import CreateTask from "../screens/tasks/CreateTask";

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
  ]);

  return <RouterProvider router={router} />;
};

export default App;
