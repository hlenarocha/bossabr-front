import Logo from "../../assets/images/MKTFlowLogo.png";
import IconMenu from "../../assets/images/icon-menu.svg";
import IconClose from "../../assets/images/icon-close.svg";

interface MenuProps {
  onClick: () => void;
  isSideBarOpen: boolean;
}

const Menu = (props: MenuProps) => {
  return (
    <>
      <div className="flex gap-6 flex-row">

        {/* shadcn */}
        <img
          alt="Ícone do menu"
          onClick={() => props.onClick()}
          className="w-14 sm:w-8 cursor-pointer hover:opacity-80"
          src={`${props.isSideBarOpen ? IconClose : IconMenu}`}
        ></img>
        <div>
          <img className="h-16 sm:flex hidden sm:w-full" src={Logo}></img>
        </div>
      </div>
    </>
  );
};

export default Menu;
