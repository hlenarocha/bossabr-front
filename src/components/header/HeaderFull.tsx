import HeaderDate from "@/components/header/HeaderDate";
import LogoutButton from "@/components/header/LogoutButton";
import SideMenu from "@/components/header/SideMenu";
import Logo from "@/assets/images/logo-bossa.svg";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Cookies from "js-cookie";

interface HeaderFullProps {
  toggleSideBar: () => void;
  isSideBarOpen: boolean;
  onClick?: () => void;
}

const HeaderFull = (props: HeaderFullProps) => {
  const [isModalLogoutVisible, setIsModalLogoutVisible] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("user_data");
    setUser(null);
    navigate("/");
    console.log("Dados removidos!")
  }

  return (
    <>
      <Modal
        title="Deseja sair?"
        iconName="fa-power-off"
        isModalVisible={isModalLogoutVisible}
        buttonTitle1="CANCELAR"
        buttonTitle2="SAIR"
        buttonColor2="bg-customRedAlert"
        onClick1={() => setIsModalLogoutVisible(false)}
        onClick2={() => {
          setIsModalLogoutVisible(false);
          handleLogout();
        }}
      ></Modal>
      <div className="flex px-10 flex-row justify-between items-center bg-[#F6BC0A] w-full h-24 shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)]">
        <SideMenu
          isSideBarOpen={props.isSideBarOpen}
          onClick={() => props.toggleSideBar()}
        ></SideMenu>
        <HeaderDate></HeaderDate>
        <img src={Logo} className="sm:hidden flex w-[128px]" />
        <LogoutButton
          onClick={() => setIsModalLogoutVisible(true)}
        ></LogoutButton>
      </div>
    </>
  );
};

export default HeaderFull;
