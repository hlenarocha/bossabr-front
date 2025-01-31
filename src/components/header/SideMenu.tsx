import Logo from "../../assets/images/logo-bossa.svg";
import IconMenu from "../../assets/images/icon-menu.svg";

const Menu = () => {
  return (
    <>
    <div className="flex flex-row">
    <img className="cursor-pointer hover:opacity-80" src={IconMenu}></img>
    <div><img className="w-32 sm:w-full" src={Logo}></img></div>
    </div>
    </>

  );
}

export default Menu;