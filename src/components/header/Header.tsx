import Logo from "../../assets/images/logo-bossa.svg";
import HeaderDate from "./HeaderDate";

const Header = () => {
  return <>
  <div className="flex items-center p-10 bg-[#F6BC0A] w-full h-24 shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)]">
    <div><img className="w-32 sm:w-full" src={Logo}></img></div>
    <HeaderDate></HeaderDate>
  </div>
  
  </>
}

export default Header;