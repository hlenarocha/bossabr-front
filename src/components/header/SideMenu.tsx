import Logo from "../../assets/images/logo-bossa.svg";
import IconMenu from "../../assets/images/icon-menu.svg";
import IconClose from "../../assets/images/icon-close.svg";

interface MenuProps {
  onClick: () => void;
  isSideBarOpen: boolean;
}

const Menu = (props: MenuProps) => {
  return (
    <>
    <div className="flex flex-row">
    <img alt="Ícone do menu" onClick={() => props.onClick()} className="cursor-pointer hover:opacity-80" src={`${props.isSideBarOpen ? IconClose : IconMenu }`}></img>
    <div><img className="w-32 sm:w-full" src={Logo}></img></div>
    </div>
    </>

  );
}

export default Menu;