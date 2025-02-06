import BaseScreen from "./BaseScreen";
import Box from "../components/box/Box";

const ClientsScreen = () => {
  return (
    <BaseScreen>
      <div className="flex absolute">
        <h1 className="text-4xl text-white font-bold">Clientes</h1>
        <Box width="w-[500px] sm:w-[1073px]" height="h-[378px]">
          <p>OLÁ</p>
        </Box>
      </div>
    </BaseScreen>
  );
};

export default ClientsScreen;