import HeaderDate from "./HeaderDate";
import LogoutButton from "./LogoutButton";
import SideMenu from "./SideMenu";

const HeaderFull = () => {
  return <>
  <div className="flex px-10  justify-between items-center bg-[#F6BC0A] w-full h-24 shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)]">
    <SideMenu></SideMenu>
    <HeaderDate></HeaderDate>
    <LogoutButton></LogoutButton>
  </div>
  
  </>
}

export default HeaderFull;