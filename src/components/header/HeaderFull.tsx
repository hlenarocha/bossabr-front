import Logo from "../../assets/images/logo-bossa.svg";
import HeaderDate from "./HeaderDate";
import LogoutButton from "./LogoutButton";

const HeaderFull = () => {
  return <>
  <div className="flex items-center p-10 bg-[#F6BC0A] w-full h-24 shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)]">
    <div><img className="w-32 sm:w-full" src={Logo}></img></div>
    <HeaderDate></HeaderDate>
    <LogoutButton></LogoutButton>
  </div>
  
  </>
}

export default HeaderFull;