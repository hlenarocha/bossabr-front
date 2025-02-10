import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";

const SettingsScreen = () => {
  return (
    <>
      <BaseScreen>
        <h1 className="text-4xl text-white font-bold">Configurações</h1>
        <div className="mt-4">
          <Box title="Colaboradores" subtitle="Veja, altere ou exclua as informações pertinentes aos colaboradores." width="w-[500px]" height="h-[378px]"></Box>
        </div>
      </BaseScreen>
    </>
  );
};

export default SettingsScreen;
