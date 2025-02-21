import SideBarItems from "./SideBarItems";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const menuItems = [
  { icon: "fa-solid fa-desktop", title: "Área de Trabalho", path: "/workspace"},
  { icon: "fa-solid fa-chart-pie", title: "Dashboard", path: "/dashboard" },
  { icon: "fa-solid fa-list-check", title: "Demandas", path: "/tasks"},
  { icon: "fa-solid fa-user-tie", title: "Clientes", path: "/clients" },
  { icon: "fa-solid fa-gear", title: "Configurações", path: "/settings" },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(path: string) {
    // changes the active item and navigate to the path
    navigate(path);
  }

  return (
    <div className=" h-[calc(100vh-8rem)] w-[250px] bg-black/10 rounded-[20px] shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25)] backdrop-blur-2xl py-5">
      <div className="flex flex-col w-full">
        {menuItems.map((item) => (
          <SideBarItems
            key={item.path}
            icon={item.icon}
            title={item.title}
            // Verifies if the current path starts with the item path, to set the active item for the children
            isActive={location.pathname.startsWith(item.path)}
            onClick={() => handleClick(item.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
