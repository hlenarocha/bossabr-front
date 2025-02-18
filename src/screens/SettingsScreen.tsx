import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";
import PageTitle from "../components/title/PageTitle";

const SettingsScreen = () => {
  return (
    <>
      <BaseScreen>
      <PageTitle title="Configurações"></PageTitle>
        <div className="mt-4">
          <Box title="Colaboradores" subtitle="Veja, altere ou exclua as informações pertinentes aos colaboradores." width="w-[500px]" height="h-[378px]">
            <div>TESTE</div>
          </Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default SettingsScreen;
