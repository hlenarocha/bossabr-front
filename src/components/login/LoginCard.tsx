import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import { requestAccess } from "@/api/oAuthRoutes";
import LoadingScreen from "@/views/auth/LoadingScreen";
import Modal from "@/components/modal/Modal";
import InputString from "../shared/InputString";
import Logo from "@/assets/images/mktflow_brand.svg";
import GoogleIcon from "@/assets/images/icon-google.png";
import IconSad from "@/assets/images/famicons_sad.png";

const LoginCard = () => {
  // Hook para tentar restaurar a sessão a partir de um cookie
  useSession();

  // Hook que contém toda a lógica de autenticação
  const {
    login,
    loading,
    isModalErrorVisible,
    setIsModalErrorVisible,
    unauthorizedEmail,
    authError,
    setAuthError,
  } = useAuth();

  // Estado local que pertence APENAS a este componente
  const [isRequestAccessModalVisible, setIsRequestAccessModalVisible] =
    useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [alertModal, setAlertModal] = useState({
    isVisible: false,
    title: "",
    description: "",
    isError: false
  });

  const showAlertModal = (title: string, description: string, isError: boolean) => {
    setAlertModal({ isVisible: true, title, description, isError });
  };

  useEffect(() => {
    if (authError) {
      showAlertModal("Erro de Conexão", authError, true);
      setAuthError(null); // Limpa o erro no hook para não mostrar o modal novamente
    }
  }, [authError, setAuthError, showAlertModal]);

  // Handler local para o modal de solicitação de acesso
  const handleRequestAccessSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!requestEmail || !emailRegex.test(requestEmail)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    setEmailError(""); 

    try {
      const response = await requestAccess(requestEmail, "new_request");
      setIsRequestAccessModalVisible(false);
      setRequestEmail("");
      showAlertModal(
        "Sucesso!",
        response.message || "Sua solicitação foi enviada com sucesso!",
        false

      );
    } catch (error) {
      setIsRequestAccessModalVisible(false);
      showAlertModal(
        "Erro na Solicitação",
        "Não foi possível enviar. Verifique o e-mail digitado ou tente mais tarde.",
        true
      );
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* NOVO: Modal de Alerta Genérico */}
      <Modal
        title={alertModal.title}
        description={alertModal.description}
        isModalVisible={alertModal.isVisible}
        buttonTitle1="FECHAR"
        onClick1={() => setAlertModal({ ...alertModal, isVisible: false })}
        buttonColor1="bg-customYellow"
        iconName="fa-solid fa-circle-info"
        isError={alertModal.isError}
        iconColor={alertModal.isError ? "text-customRedAlert" : "text-customYellow"}
      />

      {/* Modal para usuário não autorizado */}
      <Modal
        title="Usuário não autorizado!"
        description={`Seu e-mail (${unauthorizedEmail}) não está autorizado. Deseja solicitar acesso para este e-mail?`}
        isModalVisible={isModalErrorVisible}
        buttonTitle1="FECHAR"
        buttonTitle2="SIM, SOLICITAR"
        onClick1={() => setIsModalErrorVisible(false)}
        onClick2={async () => {
          await requestAccess(unauthorizedEmail, "unauthorized");
          setIsModalErrorVisible(false);
          showAlertModal(
            "Solicitação Enviada",
            "Sua solicitação de acesso foi enviada com sucesso. Aguarde a aprovação do administrador.",
            false
          );
        }}
        buttonColor1="bg-customRedAlert"
        buttonColor2="bg-customYellow"
        iconImage={IconSad}
        isError={true}
      />

      {/* Modal para solicitar acesso manualmente */}
      <Modal
        title="Solicitar Acesso"
        isModalVisible={isRequestAccessModalVisible}
        buttonTitle1="CANCELAR"
        buttonTitle2="ENVIAR SOLICITAÇÃO"
        onClick1={() => setIsRequestAccessModalVisible(false)}
        onClick2={handleRequestAccessSubmit}
        buttonColor1="bg-customRedAlert"
        buttonColor2="bg-customYellow"
        iconName="fa-solid fa-envelope"
      >
        <p className="text-md text-white mb-4">
          Digite seu e-mail para que o administrador possa liberar seu acesso.
        </p>
        <InputString
          title="E-MAIL"
          placeholder="seu.email@exemplo.com"
          isMandatory={true}
          value={requestEmail}
          height="h-12"
          errorMessage={emailError}
          borderColor={emailError ? "border-customRedAlert" : "border-customYellow"}
          onChange={(e) => {
            setRequestEmail(e.target.value)
            if (emailError) {
              setEmailError("");
            }
          }}
        />
      </Modal>

      <div className="w-[90%] max-w-[600px] flex absolute flex-col justify-center items-center h-auto sm:h-[600px] bg-black/10 rounded-lg sm:rounded-full p-10 shadow-[inset_-4px_-4px_5px_0px_rgba(255,255,255,0.25),inset_4px_4px_5px_0px_rgba(255,255,255,0.25)] backdrop-blur-[30px]">
        <img className="w-72 mb-8" src={Logo} alt="Logo MKTFlow" />
        <div className="w-full cursor-default max-w-[368px] h-[46px] text-white text-[32px] font-normal font-alatsi text-left">
          Login
        </div>
        <div
          onClick={() => login()}
          className="w-full max-w-[371px] h-[38px] hover:border-[4px] hover:border-[#F8BB49] hover:cursor-pointer flex items-center justify-center bg-white rounded-[10px] shadow-[28px_28px_50px_0px_rgba(17,17,17,0.25)] mt-5"
        >
          <div className="bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center mr-[10px]">
            <img src={GoogleIcon} alt="Google" />
          </div>
          <div className="text-black font-alatsi font-[500]">
            Continuar com o Google
          </div>
        </div>
        <div
          onClick={() => setIsRequestAccessModalVisible(true)}
          className="w-full max-w-[368px] mt-8 h-[19px] text-center text-white text-base font-normal font-alatsi underline hover:cursor-pointer hover:opacity-70"
        >
          Ainda não tenho acesso ao sistema!
        </div>
      </div>
    </>
  );
};

export default LoginCard;
