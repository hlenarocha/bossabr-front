import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/LoginScreen";
import Base from "./screens/BaseScreen";
import Dashboard from "./screens/DashboardScreen";
import Tasks from "./screens/TasksScreen";
import Clients from "./screens/ClientsScreen";
import Settings from "./screens/SettingsScreen";
import Workspace from "./screens/WorkspaceScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/base" element={<Base>Some children content</Base>}></Route>
        <Route path="/workspace" element={<Workspace />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/clients" element={<Clients />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
