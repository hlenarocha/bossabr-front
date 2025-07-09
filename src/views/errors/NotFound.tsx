import { useNavigate } from "react-router-dom";
import BaseScreen from "@/views/BaseScreen";
import ColoredButton from "@/components/shared/ColoredButton";
import Box from "@/components/box/BoxContent";
import Image from "@/assets/images/bolota.png"; // Import an image for the 404 error
import { Motion } from "@/components/animation/Motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <BaseScreen>
      <Motion>
        <Box
            width="w-full"
            height="h-fit">
          <div className="flex flex-col text-white items-center justify-center">
            <p className="text-xl font-bold text-white mb-2">ERRO</p>
            <h1 className="text-8xl font-bold text-customYellow [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
              404
            </h1>
            <p className="text-2xl font-bold text-white mt-6 bg-customYellow bg-opacity-40 px-6 py-2 rounded-lg">
              PÁGINA NÃO ENCONTRADA!
            </p>
            <img
              className="max-w-[300px] mt-6 mb-6"
              src={Image}
              alt="404 Mascote"
            />{" "}
            <i className="text-lg mt-2 mb-8 text-gray-300 text-center">
              Ihh, parece que essa página foi curtir um sol na praia e não
              voltou...
            </i>
            <ColoredButton
              title="VOLTAR PARA O INÍCIO"
              icon="fa-solid fa-desktop"
              onClick={() => navigate("/area-trabalho")}
              color="customYellow"
              width="w-[250px]"
              justify="justify-center"
            />
          </div>
        </Box>
      </Motion>
    </BaseScreen>
  );
};

export default NotFound;
