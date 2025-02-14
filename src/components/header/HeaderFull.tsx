import HeaderDate from "./HeaderDate";
import LogoutButton from "./LogoutButton";
import SideMenu from "./SideMenu";
import Logo from "../../assets/images/logo-bossa.svg";


interface HeaderFullProps {
  toggleSideBar: () => void;
  isSideBarOpen: boolean;
}


const HeaderFull = (props: HeaderFullProps) => {

  return <>
  <div className="flex px-10 flex-row justify-between items-center bg-[#F6BC0A] w-full h-24 shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)]">
    <SideMenu isSideBarOpen = {props.isSideBarOpen} onClick={() => props.toggleSideBar()}></SideMenu>
    <HeaderDate></HeaderDate>
    <img src={Logo} className="sm:hidden flex w-[128px]" />
    <LogoutButton></LogoutButton>
  </div>
  
  </>
}

export default HeaderFull;