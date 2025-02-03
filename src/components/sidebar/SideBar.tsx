import SideBarItems from "./SideBarItems";

const SideBar = () => {
  return(
    <div className="h-full absolute flex w-[250px] bg-black/10 rounded-[20px] shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25)] backdrop-blur-2xl py-5 px-5">
      <div className="flex flex-col w-full">
        <SideBarItems icon="fa fa-home" title="Home"></SideBarItems>
        <SideBarItems icon="fa-solid fa-desktop" title="Área de Trabalho"></SideBarItems>
        <SideBarItems icon="fa-solid fa-chart-pie" title="Dashboard"></SideBarItems>
        <SideBarItems icon="fa-solid fa-list-check" title="Demandas"></SideBarItems>
        <SideBarItems icon="fa-solid fa-user-tie" title="Clientes"></SideBarItems>
        <SideBarItems icon="fa-solid fa-gear" title="Configurações"></SideBarItems>



      </div>  
    </div>
  
  );
}

export default SideBar;