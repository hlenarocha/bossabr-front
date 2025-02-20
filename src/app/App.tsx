import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../screens/LoginScreen";
import Dashboard from "../screens/DashboardScreen";
import Tasks from "../screens/tasks/TasksScreen";
import Clients from "../screens/ClientsScreen";
import Settings from "../screens/SettingsScreen";
import Workspace from "../screens/WorkspaceScreen";
import CreateTask from "../screens/tasks/CreateTask";

// Estudar Outlet

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
      children: [
        { }
      ]
    },
    {
      path: "/tasks",
      element: <Tasks />,
      children: [
        {
          path: "create-task",
          element: <CreateTask />
        }
      ]
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
