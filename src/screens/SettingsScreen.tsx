import BaseScreen from "./BaseScreen";
import Box from "../components/box/BoxContent";

const SettingsScreen = () => {
  return (
    <>
    <BaseScreen>
      <h1 className="text-4xl text-white font-bold">Configurações</h1>
      <div className="mt-4">
        <Box width="w-[500px]" height="h-[378px]">
          <p>BOX CONTENT</p>
        </Box>
        <Box width="w-[500px]" height="h-[378px]">
          <p>BOX CONTENT</p>
        </Box>
        <Box width="w-[500px]" height="h-[378px]">
          <p>BOX CONTENT</p>
        </Box>
        <Box width="w-[500px]" height="h-[378px]">
          <p>BOX CONTENT</p>
        </Box>
      </div>
    </BaseScreen>
  </>
  );
};

export default SettingsScreen;