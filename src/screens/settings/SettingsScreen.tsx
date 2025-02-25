import BaseScreen from "../BaseScreen";
import Box from "../../components/box/BoxContent";
import PageTitle from "../../components/title/PageTitle";
import ColoredButton from "../../components/UI/ColoredButton";
import { useNavigate } from "react-router-dom";

const SettingsScreen = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/settings/configure-worker");
  }

  return (
    <>
      <BaseScreen>
      <PageTitle title="Configurações"></PageTitle>
        <div className="mt-4">
          <Box title="Colaboradores" subtitle="Veja, altere ou exclua as informações pertinentes aos colaboradores." width="w-[500px]" height="h-[378px]">
            <div className="flex items-center">
            <ColoredButton onClick={() => handleClick()} justify="justify-between" width="w-[450px]" icon="fa solid fa-arrow-right" color="customYellow" title="CONFIGURAR COLABORADORES"></ColoredButton>


            </div>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default SettingsScreen;
