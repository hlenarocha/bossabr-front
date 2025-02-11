import HeaderDate from "./HeaderDate";
import LogoutButton from "./LogoutButton";
import SideMenu from "./SideMenu";


interface HeaderFullProps {
  toggleSideBar: () => void;
  isSideBarOpen: boolean;
}


const HeaderFull = (props: HeaderFullProps) => {

  return <>
  <div className="flex px-10 flex-row sm:justify-between items-center bg-[#F6BC0A] w-full h-24 shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)]">
    <SideMenu isSideBarOpen = {props.isSideBarOpen} onClick={() => props.toggleSideBar()}></SideMenu>
    <HeaderDate></HeaderDate>
    <LogoutButton></LogoutButton>
  </div>
  
  </>
}

export default HeaderFull;